var express = require('express')
var router = express.Router()
var models = require('../models/index')
var twilioClient = require('../twilioClient')
var Q = require('q')

const SMS_LENGTH = 159

Array.prototype.flatten = function() {
  return this.reduce((acc, val) => acc.concat(val), [])
}

var getPhoneNumbers = function(strategy, id) {
  switch (strategy) {
    case 'households':
      return models.Household.findById(id, { include: models.Contact }).then(
        household => {
          if (household === null) {
            return []
          }
          return household.Contacts.map(
            contact => contact.phoneNumbers
          ).flatten()
        }
      )
      break
    case 'locations':
      return models.Location.findById(id, {
        include: [
          {
            model: models.Classroom,
            include: [
              {
                model: models.Student,
                include: [
                  {
                    model: models.Household,
                    include: models.Contact
                  }
                ]
              }
            ]
          }
        ]
      }).then(location => {
        if (location === null) {
          return []
        }
        return location.Classrooms.map(classroom => classroom.Students)
          .flatten()
          .map(student => student.Household.Contacts)
          .flatten()
          .map(contact => contact.phoneNumbers)
          .flatten()
      })
      break
    case 'classrooms':
      return models.Classroom.findById(id, {
        include: [
          {
            model: models.Student,
            include: [
              {
                model: models.Household,
                include: models.Contact
              }
            ]
          }
        ]
      }).then(classroom => {
        if (classroom === null) {
          return []
        }
        return classroom.Students.map(student => student.Household.Contacts)
          .flatten()
          .map(contact => contact.phoneNumbers)
          .flatten()
      })
      break
    case 'all':
      return models.Contact.findAll().then(contacts => {
        return contacts.map(contact => contact.phoneNumbers).flatten()
      })
      break
  }

  return []
}

var convertToE164 = function(phoneNumber) {
  phoneNumber = phoneNumber + ''
  phoneNumber = phoneNumber.replace(/\(|\)|-|\s|\./g, '')

  return phoneNumber.startsWith('+1') ? phoneNumber : `+1${phoneNumber}`
}

var startTwilio = (message, numbers) => {
  var message_prefix =
    process.env.CONTACT_PORTAL_TWILIO_MESSAGE_PREFIX || 'McNeilly: '

  message = message_prefix + message

  message = message.substring(0, SMS_LENGTH)

  numbers = Array.from(new Set(numbers.map(convertToE164)))

  return numbers.map(number => twilioClient.sendSms(number, message))
}

router.post('/:strategy/:id', function(req, res, next) {
  var message = req.body.message
  var { strategy, id } = req.params
  id = Number.parseInt(id)

  var allowedStrategies = ['households', 'locations', 'classrooms']

  if (!allowedStrategies.includes(strategy)) {
    return res.status(400).send({ error: 'Strategy is not allowed' })
  }

  if (message === undefined || message === '') {
    return res
      .status(400)
      .send({ error: 'Message cannot be empty or undefined.' })
  }

  getPhoneNumbers(strategy, id)
    .then(function(phoneNumbers) {
      return Q.allSettled(startTwilio(message, phoneNumbers)).then(function(
        results
      ) {
        return results.map(result => result)
      })
    })
    .then(function(data) {
      return res.status(200).send({ attempts: data })
    })
    .catch(error => res.status(500).send({ error: error.message }))
})

router.post('/', function(req, res, next) {
  var message = req.body.message

  if (message === undefined || message === '') {
    return res
      .status(400)
      .send({ error: 'Message cannot be empty or undefined.' })
  }

  getPhoneNumbers('all')
    .then(function(phoneNumbers) {
      return Q.allSettled(startTwilio(message, phoneNumbers)).then(function(
        results
      ) {
        return results.map(result => result)
      })
    })
    .then(function(data) {
      return res.status(200).send({ attempts: data })
    })
    .catch(error => res.status(500).send({ error: error.message }))
})

module.exports = router
