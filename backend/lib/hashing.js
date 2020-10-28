'use strict'
const bcrypt = require('bcrypt')

const hash = password => {
  return bcrypt.hashSync(password, 10)
}

const compare = (password, hash) => {
  return bcrypt.compare(password, hash)
}

module.exports = {
  hash,
  compare
}
