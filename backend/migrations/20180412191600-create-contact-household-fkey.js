'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Contacts', ['householdId'], {
      type: 'FOREIGN KEY',
      name: 'Contacts_householdId_fkey',
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
