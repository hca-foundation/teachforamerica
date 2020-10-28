'use strict'
module.exports = (sequelize, DataTypes) => {
  var Contact = sequelize.define(
    'Contact',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      relationship: DataTypes.STRING,
      phoneNumbers: DataTypes.JSONB,
      emails: DataTypes.JSONB,
      householdId: DataTypes.INTEGER
    },
    {
      timestamps: true
    }
  )

  Contact.associate = function(models) {
    Contact.belongsTo(models.Household, {
      foreignKey: {
        name: 'householdId',
        allowNull: false
      }
    })

    Contact.hasOne(models.Household, {
      foreignKey: {
        name: 'primaryContactId',
        allowNull: true
      }
    })
  }

  return Contact
}
