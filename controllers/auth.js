'use strict'

const Persona = require('../models/persona')
const service = require('../services')

function signUp (req, res) {
  const persona = req.body

  Persona.create(persona)
  .then(personaStored => {
    res.status(200).send({
      persona: personaStored,
      token: service.createToken(persona)
    })
  })
  .catch(err => res.status(500).send({ message: `Error al guardar la persona en la base de datos: ${err}` }))
}

function signIn (req, res) {
  let usuario = req.body.usuario
  Persona.findOne({
    where: {
      usuario: usuario
    }
  })
  .then(persona => {
    if (!persona) return res.status(404).send({ message: `El usuario ${usuario} no existe` })
    res.status(200).send({
      persona,
      token: service.createToken(persona)
    })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

module.exports = {
  signUp,
  signIn
}
