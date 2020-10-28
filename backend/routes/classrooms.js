const { Classroom } = require('../models/index')
var router = require('./base')(Classroom, {
  fields: ['name', 'locationId']
})

module.exports = router
