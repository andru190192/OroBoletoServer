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

function decodeToken (token) {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.secretToken)
      resolve(payload.sub)
    } catch (err) {
      let error = new Error('El token no es valido o ha expirado')
      error.statusCode = 401
      reject(error)
    }
  })
}

module.exports = {
  createToken,
  decodeToken
}
