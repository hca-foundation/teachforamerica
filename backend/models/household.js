'use strict'
module.exports = (sequelize, DataTypes) => {
  var Household = sequelize.define(
    'Household',
    {
      primaryContactId: DataTypes.INTEGER,
      pin: DataTypes.STRING,
      notes: DataTypes.STRING
    },
    {
      timestamps: true
    }
  )
  Household.prototype.toJSON = function() {
    var values = Object.assign({}, this.get())

    delete values.pin
    return values
  }

  Household.associate = function(models) {
    Household.hasMany(models.Contact, {
      foreignKey: {
        name: 'householdId',
        allowNull: false
      }
    })

    Household.hasMany(models.Student, {
      foreignKey: {
        name: 'householdId',
        allowNull: false
      }
    })

    Household.belongsTo(models.Contact, {
      foreignKey: {
        name: 'primaryContactId',
        allowNull: true
      },
      as: 'PrimaryContact'
    })
  }

  return Household
}
