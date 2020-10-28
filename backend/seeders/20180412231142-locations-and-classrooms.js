'use strict'
var models = require('../models/index')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      models.Location.create({ name: 'Infant Site' }).then(infantSite => {
        console.log(JSON.stringify(infantSite))
        models.Classroom.bulkCreate(
          [
            {
              name: 'IT1',
              locationId: infantSite.id
            },
            {
              name: 'IT2',
              locationId: infantSite.id
            },
            {
              name: 'IT3',
              locationId: infantSite.id
            },
            {
              name: 'IT4',
              locationId: infantSite.id
            },
            {
              name: 'IT5',
              locationId: infantSite.id
            },
            {
              name: 'IT6',
              locationId: infantSite.id
            }
          ],
          {}
        ).then(result => {
          console.log(JSON.stringify(result))
        })
      }),
      models.Location.create({ name: 'Main Site' }).then(mainSite => {
        console.log(JSON.stringify(mainSite))
        models.Classroom.bulkCreate(
          [
            {
              name: '1A',
              locationId: mainSite.id
            },
            {
              name: '1B',
              locationId: mainSite.id
            },
            {
              name: '2A',
              locationId: mainSite.id
            },
            {
              name: '2B',
              locationId: mainSite.id
            },
            {
              name: '3',
              locationId: mainSite.id
            },
            {
              name: '4A',
              locationId: mainSite.id
            },
            {
              name: '4B',
              locationId: mainSite.id
            },
            {
              name: '5',
              locationId: mainSite.id
            },
            {
              name: '6',
              locationId: mainSite.id
            },
            {
              name: '7',
              locationId: mainSite.id
            },
            {
              name: '8',
              locationId: mainSite.id
            },
            {
              name: '9',
              locationId: mainSite.id
            },
            {
              name: '10',
              locationId: mainSite.id
            },
            {
              name: '11',
              locationId: mainSite.id
            }
          ],
          {}
        ).then(result => {
          console.log(JSON.stringify(result))
        })
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Classrooms', null, {}).then(() => {
      queryInterface.bulkDelete('Locations', null, {})
    })
  }
}
