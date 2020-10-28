'use strict'
const { hash } = require('../lib/hashing.js')

var hashPassword = function(admin) {
  admin.password = hash(admin.password)
}

module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define(
    'Admin',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      super: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {}
  )
  Admin.prototype.toJSON = function() {
    var values = Object.assign({}, this.get())

    delete values.password
    return values
  }
  Admin.associate = function(models) {
    // associations can be defined here
  }
  Admin.beforeCreate(hashPassword)
  Admin.beforeUpdate(hashPassword)

  return Admin
}
