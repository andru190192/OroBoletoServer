'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (persona) {
  const payload = {
    sub: persona.usuario,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return jwt.encode(payload, config.secretToken)
}

function decodeToken (headers) {
  const token = headers.authorization.split(' ')[1]
  return jwt.decode(token, config.secretToken)
}

module.exports = {
  createToken,
  decodeToken
}
