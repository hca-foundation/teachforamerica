'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Admins', {
      fields: ['username', 'password'],
      name: 'Admins_username_password_idx'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Admins', 'Admins_username_password_idx')
  }
}
