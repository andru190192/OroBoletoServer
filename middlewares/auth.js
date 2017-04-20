'use strict'

const service = require('../services')
const Persona = require('../models/persona')

function isAuth (req, res, next) {
  if (!req.headers.authorization) { return res.status(403).send({ message: 'No tienes Autorizacion' }) }

  const token = req.headers.authorization.split(' ')[1]

  service.decodeToken(token)
  .then(usuario => {
    Persona.findOne({
      where: { usuario }
    })
    .then(persona => {
      if (!persona) return res.status(404).send({ message: `El usuario ${usuario} no existe` })
      req.persona = persona
      next()
    })
    .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
  })
  .catch(err => {
    res.status(err.statusCode).send({ message: err.message })
  })
}

module.exports = isAuth
