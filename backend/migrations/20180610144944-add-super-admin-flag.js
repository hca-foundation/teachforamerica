'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Admins', 'super', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Admins', 'super')
  }
}
