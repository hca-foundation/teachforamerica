'use strict'
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define(
    'Student',
    {
      householdId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {
      timestamps: true
    }
  )

  Student.associate = function(models) {
    Student.belongsTo(models.Household, {
      foreignKey: {
        name: 'householdId',
        allowNull: false
      }
    })

    Student.belongsTo(models.Classroom, {
      foreignKey: {
        name: 'classId',
        allowNull: true
      }
    })
  }

  return Student
}
