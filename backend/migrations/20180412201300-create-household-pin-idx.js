'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Families', {
      fields: ['pin'],
      name: 'Households_pin_idx'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Families', 'Households_pin_idx')
  }
}
