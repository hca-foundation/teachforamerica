'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Contacts', 'lastName', {
      type: 'CITEXT USING CAST("lastName" as CITEXT)'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Contacts', 'lastName', {
      type:
        'character varying(255) USING CAST("lastName" as character varying(255))'
    })
  }
}
