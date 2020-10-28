var expect = require('chai').expect
var User = require('../../lib/models/user.js')

describe('User', function() {
  describe('Has the right properties', function() {
    it('can get and set username', function() {
      var user = new User()
      user.setUsername('test')
      expect(user.getUsername()).to.equal('test')
    })
    it('can get and set password', function() {
      var user = new User()
      user.setPassword('test')
      expect(user.getPassword()).to.equal('test')
    })
  })
})
