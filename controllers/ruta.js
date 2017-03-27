'use strict'

const Ruta = require('../models/ruta')

function getRuta (req, res) {
  let cooperativaId = req.params.cooperativaId
  let origenId = req.params.origenId
  let destinoId = req.params.destinoId
  Ruta.findOne({ where: { cooperativa: cooperativaId, origen: origenId, destino:  destinoId } })
  .then(ruta => {
    if(!ruta) return res.status(404).send({ message: `La cooperativa '${cooperativaId}' no tiene la ruta de '${origenId}' a '${destinoId}'` })
    res.status(200).send({ ruta })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getRutas (req, res) {
  let cooperativaId = req.params.cooperativaId
  Ruta.findAll({ where: { cooperativa: cooperativaId } })
  .then(rutas => {
    if(!rutas) return res.status(404).send({ message: `La cooperativa '${cooperativaId}' no tiene rutas` })
    res.status(200).send({ rutas })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}


module.exports = {
  getRuta,
  getRutas
}
