'use strict'
module.exports = (sequelize, DataTypes) => {
  var Classroom = sequelize.define(
    'Classroom',
    {
      name: DataTypes.STRING,
      locationId: DataTypes.INTEGER
    },
    {
      timestamps: true
    }
  )

  Classroom.associate = models => {
    Classroom.belongsTo(models.Location, {
      foreignKey: {
        name: 'locationId',
        allowNull: false
      }
    })

    Classroom.hasMany(models.Student, {
      foreignKey: {
        name: 'classId',
        allowNull: true
      }
    })
  }

  return Classroom
}
