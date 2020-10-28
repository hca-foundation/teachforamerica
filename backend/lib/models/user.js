function User(username, password) {
  this.username = username
  this.password = password
}

User.prototype.update = function() {}

User.prototype.getUsername = function() {
  return this.username
}
User.prototype.setUsername = function(username) {
  this.username = username
}

User.prototype.getPassword = function() {
  return this.password
}
User.prototype.setPassword = function(password) {
  this.password = password
}

module.exports = User
