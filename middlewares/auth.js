'use strict'

const jwt = require('jwt-simple')
const service = require('../services');
const Persona = require('../models/persona')

function isAuth (req, res, next) {
  if(!req.headers.authorization)
    return res.status(403).send({ message: 'No tienes Autorizacion' })

  try {
    const payload = service.decodeToken(req.headers)
    Persona.findOne({
      where: {
        usuario: payload.sub
      }
    })
    .then(persona => {
      if(!persona) return res.status(404).send({ message: `El usuario ${payload.sub} no existe` })
      req.persona = persona
      next()
    })
    .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
  } catch (err) {
    if (err instanceof SyntaxError)
      return res.status(401).send({ message: 'El token no es valido' })
    if (err instanceof Error)
      return res.status(401).send({ message: 'El token ha expirado' })
  }
}

module.exports = isAuth
