'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Admins', 'username', {
      type: 'CITEXT USING CAST("username" as CITEXT)'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Admins', 'username', {
      type:
        'character varying(255) USING CAST("username" as character varying(255))'
    })
  }
}
