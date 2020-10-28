const { Student } = require('../models/index')
var router = require('./base')(Student, {
  fields: ['householdId', 'firstName', 'lastName', 'classId']
})

module.exports = router
