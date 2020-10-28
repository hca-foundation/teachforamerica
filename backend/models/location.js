'use strict'
module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define(
    'Location',
    {
      name: DataTypes.STRING
    },
    {
      timestamps: true
    }
  )

  Location.associate = function(models) {
    Location.hasMany(models.Classroom, {
      foreignKey: {
        name: 'locationId',
        allowNull: false
      }
    })
  }

  return Location
}
