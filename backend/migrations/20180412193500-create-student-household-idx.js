'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('AdminMgmt', {
      fields: ['householdId'],
      name: 'Students_householdId_idx'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('AdminMgmt', 'Students_householdId_idx')
  }
}
