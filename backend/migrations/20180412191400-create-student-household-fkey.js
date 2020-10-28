'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('AdminMgmt', ['householdId'], {
      type: 'FOREIGN KEY',
      name: 'Students_householdId_fkey',
      references: {
        table: 'Families',
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
