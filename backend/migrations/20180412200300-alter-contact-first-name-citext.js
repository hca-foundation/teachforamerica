'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION citext')
      .then(() => {
        return queryInterface.changeColumn('Contacts', 'firstName', {
          type: 'CITEXT USING CAST("firstName" as CITEXT)'
        })
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Contacts', 'firstName', {
      type:
        'character varying(255) USING CAST("firstName" as character varying(255))'
    })
  }
}
