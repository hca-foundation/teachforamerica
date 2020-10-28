'use strict'
var { Admin } = require('../models/index')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Admin.create({
      username: 'admin-user2',
      password: '$2b$10$Uw6o.IbxKS6qhvuHLjM5L.D4xxPSfSGY2B5BeW3z3ivT2B08UT.Qm'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {})
  }
}
