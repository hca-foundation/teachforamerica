'use strict'
var models = require('../models/index')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return models.Classroom.create({
      name: 'Staff',
      locationId: 1
    });
  },

  down: (queryInterface, Sequelize) => {
    return models.Classroom.destroy({
      where: {
        name: 'Staff',
        locationId: 1
      }
    });
  }
}
