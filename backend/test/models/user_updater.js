var expect = require('chai').expect
var sinon = require('sinon')
var User = require('../../lib/models/user.js')
var UserUpdater = require('../../lib/models/user_updater.js')

describe('UserUpdater', function() {
  it('calls user.update() to update the user', function() {
    var mockUser = sinon.mock(new User())

    var updater = new UserUpdater(mockUser.object)

    mockUser
      .expects('update')
      .once()
      .returns(true)

    var result = updater.update()
    expect(result).be.true

    mockUser.verify()
  })
  it('calls user.update() to update the user with spy', function() {
    var spyUser = new User()
    sinon.spy(spyUser, 'update') // This spies an existing method

    var updater = new UserUpdater(spyUser)

    updater.update()

    expect(spyUser.update.calledOnce).be.true
  })

  it('calls user.update() to update the user with stub', function() {
    var stubbedUser = new User()
    sinon.stub(stubbedUser, 'update').returns(true)

    var updater = new UserUpdater(stubbedUser)

    var result = updater.update()
    expect(result).be.true

    expect(stubbedUser.update.calledOnce).be.true
    // If the above works like it does, is there any point to use mocks?
    // Mocks are not spied, they are completely proxied
    // Mocks seem to fail if an expectation has not been defined.
  })
})
