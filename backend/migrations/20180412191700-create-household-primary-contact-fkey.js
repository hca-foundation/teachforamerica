'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Families', ['primaryContactId'], {
      type: 'FOREIGN KEY',
      name: 'Households_primaryContactId_fkey',
      references: {
        table: 'Contacts',
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
