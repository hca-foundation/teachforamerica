'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('AdminMgmt', {
      fields: ['classId'],
      name: 'Students_classId_idx'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('AdminMgmt', 'Students_classId_idx')
  }
}
