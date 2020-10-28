const { Contact, Household } = require('../models/index')
const { compare } = require('../lib/hashing')
const router = require('./base')(Contact, {
  fields: [
    'householdId',
    'firstName',
    'lastName',
    'phoneNumbers',
    'emails',
    'relationship'
  ]
})

router.post('/search', function(req, res, next) {
  const { firstName, lastName, pin } = req.body

  Contact.findOne({
    where: { firstName, lastName },
    include: [
      {
        model: Household
      }
    ]
  })
    .then(function(contact) {
      if (!contact || !contact.Household || !contact.Household.pin) {
        return userError(res)
      }

      compare(pin, contact.Household.pin)
        .then(isAMatch => {
          if (isAMatch) {
            return res.send(contact)
          } else {
            return userError(res)
          }
        })
        .catch(e => {
          return userError(res)
        })
    })
    .catch(error => res.status(500).send({ error: error.message }))
})

const userError = res => {
  res.status(404).send({ error: 'Household not found or incorrect PIN.' })
}

module.exports = router
