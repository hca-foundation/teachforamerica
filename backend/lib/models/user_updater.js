function UserUpdater(user) {
  this.user = user
}

UserUpdater.prototype.update = function() {
  return this.user.update()
}

module.exports = UserUpdater
