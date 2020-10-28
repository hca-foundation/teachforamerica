'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Classrooms', {
      fields: ['locationId'],
      name: 'Classrooms_locationId_idx'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Classrooms', 'Classrooms_locationId_idx')
  }
}
