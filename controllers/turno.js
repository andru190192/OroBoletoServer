'use strict'

const { sequelize } = require('../models/sequelizeConf')
const Turno = require('../models/turno')

function getTurno (req, res) {
  let cooperativaId = req.params.cooperativaId
  let origenId = req.params.origenId
  let destinoId = req.params.destinoId
  Turno.findAll({ where: { cooperativa: cooperativaId, origen: origenId, destino:  destinoId } })
  .then(turno => {
    if(!turno) return res.status(404).send({ message: `La cooperativa '${cooperativaId}' no tiene el turno de '${origenId}' a '${destinoId}'` })
    res.status(200).send({ turno })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getTurnos (req, res) {
  let cooperativaId = req.params.cooperativaId
  Turno.findAll({ where: { cooperativa: cooperativaId } })
  .then(turnos => {
    if(turnos.length <= 0) return res.status(404).send({ message: `La cooperativa '${cooperativaId}' no tiene turnos` })
    res.status(200).send({ turnos })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}


module.exports = {
  getTurno,
  getTurnos
}
