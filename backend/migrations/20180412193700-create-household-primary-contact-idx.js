'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Families', {
      fields: ['primaryContactId'],
      name: 'Households_primaryContactId_idx'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex(
      'Families',
      'Households_primaryContactId_idx'
    )
  }
}
