'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('AdminMgmt', ['classId'], {
      type: 'FOREIGN KEY',
      name: 'Students_classId_fkey',
      references: {
        table: 'Classrooms',
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
