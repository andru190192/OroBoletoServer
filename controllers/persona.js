'use strict'

const Persona = require('../models/persona')

function getPersona (req, res) {
  let personaId = req.params.personaId
  Persona.findById(personaId)
  .then(persona => {
    if (!persona) return res.status(404).send({ message: `La persona con el numero de identificacion '${personaId}' no existe` })
    res.status(200).send({ persona })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getPersonas (req, res) {
  Persona.findAll()
  .then(personas => {
    if (personas.length <= 0) return res.status(404).send({ message: `No existen personas registradas` })
    res.status(200).send({ personas })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function savePersona (req, res) {
  let persona = req.body
  Persona.create(persona)
  .then(personaStored => {
    res.status(200).send({ persona: personaStored })
  })
  .catch(err => res.status(500).send({ message: `Error al guardar la informacion de la persona en la base de datos: ${err}` }))
}

function updatePersona (req, res) {
  let personaId = req.params.personaId
  let persona = req.body
  Persona.update(persona, { where: { cedula_ruc: personaId }, returning: true })
  .then((personaUpdate) => {
    if (personaUpdate[0] <= 0) return res.status(404).send({ message: `La persona con el numero de identificacion '${personaId}' no existe` })
    res.status(200).send({ persona: personaUpdate[1] })
  })
  .catch(err => res.status(500).send({ message: `Error al actualizar la informacion de la persona en la base de datos: ${err}` })
  )
}

function deletePersona (req, res) {
  let personaId = req.params.personaId
  Persona.destroy({ where: { cedula_ruc: personaId } })
  .then(personaCountDelete => {
    if (personaCountDelete <= 0) return res.status(404).send({ message: `La persona con el numero de identificacion '${personaId}' no existe` })
    res.status(200).send({ message: `La persona con el numero de identificacion '${personaId}' ha sido eliminada` })
  })
  .catch(err => res.status(500).send({ message: `Error al eliminar la informacion de la persona en la base de datos: ${err}` }))
}

module.exports = {
  getPersona,
  getPersonas,
  savePersona,
  updatePersona,
  deletePersona
}
