'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Contacts', {
      fields: ['householdId'],
      name: 'Contacts_householdId_idx'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Contacts', 'Contacts_householdId_idx')
  }
}
