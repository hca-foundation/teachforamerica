const { Location } = require('../models/index')
var router = require('./base')(Location, {
  fields: ['name']
})

module.exports = router
