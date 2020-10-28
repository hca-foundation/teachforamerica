const { Contact, Household, Student } = require('../models/index')
const { hash } = require('../lib/hashing')
const validFields = {
  fields: ['primaryContactId', 'pin', 'notes']
}

const router = require('./base')(Household, validFields, {
  index: (req, res, next) => {
    Household.findAll({
      include: [
        {
          model: Contact,
          as: 'PrimaryContact'
        }
      ],
      order: [['PrimaryContact', 'firstName']]
    })
      .then(households =>
        res.send(households.map(household => household.toJSON()))
      )
      .catch(error => res.status(500).send(error))
  },
  create: (req, res, next) => {
    if (req.body.pin) {
      req.body.pin = hash(req.body.pin)
    }

    Household.create(req.body, validFields)
      .then(household => res.send(household.toJSON()))
      .catch(error => res.status(500).send(error))
  },
  update: (req, res, next) => {
    Household.findById(req.params.id)
      .then(household => {
        if (req.body.pin) {
          req.body.pin = hash(req.body.pin)
        }

        household
          .update(req.body, validFields)
          .then(household => res.send(household.toJSON()))
          .catch(error => res.status(500).send(error))
      })
      .catch(error => res.status(404).send({ error: 'Not found.' }))
  },
  destroy: (req, res, next) => {
    Household.update(
      {
        primaryContactId: null
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(() => {
        return Promise.all([
          Contact.destroy({
            where: {
              householdId: req.params.id
            }
          }),
          Student.destroy({
            where: {
              householdId: req.params.id
            }
          })
        ])
      })
      .then(() => {
        return Household.findById(req.params.id)
      })
      .then(model => {
        model
          .destroy()
          .then(result => res.status(204).end())
          .catch(error => res.status(501).send(error.message))
      })
      .catch(error => res.status(404).send({ error: 'Not found.' }))
  }
})

module.exports = router
