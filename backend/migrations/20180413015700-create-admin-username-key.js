'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Admins', ['username'], {
      type: 'unique',
      name: 'Admins_username_key'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Admins', 'Admins_username_key')
  }
}
