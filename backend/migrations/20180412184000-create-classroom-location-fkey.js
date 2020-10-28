'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Classrooms', ['locationId'], {
      type: 'FOREIGN KEY',
      name: 'Classrooms_locationId_fkey',
      references: {
        table: 'Locations',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    })
  },
  down: (queryInterface, Sequelize) => {
    return null
  }
}
