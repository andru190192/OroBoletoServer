'use strict'

const { sequelize } = require('../models/sequelizeConf')
const Turno = require('../models/turno')

function getTurno (req, res) {
  let codigoId = req.params.codigoId
  Turno.findAll({ where: { codigo: codigoId } })
  .then(turno => {
    if(!turno) return res.status(404).send({ message: `La cooperativa '${cooperativaId}' no tiene el turno de '${origenId}' a '${destinoId}'` })
    res.status(200).send({ turno })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getTurnos (req, res) {
  let cooperativaId = req.params.cooperativaId
  let origenId = req.params.origenId
  let destinoId = req.params.destinoId
  Turno.findAll({ where: { cooperativa: cooperativaId, origen: origenId, destino:  destinoId } })
  .then(turnos => {
    if(turnos.length <= 0) return res.status(404).send({ message: `La cooperativa '${cooperativaId}' no tiene turnos` })
    res.status(200).send({ turnos })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getTurnosPorFecha (req, res) {
  let origenId = req.params.origenId.toUpperCase()
  let destinoId = req.params.destinoId.toUpperCase()
  let fecha = req.params.fecha
  sequelize.query(`SELECT * FROM oroticket.fun_turno('${origenId}', '${destinoId}', '${fecha}');`, { type: sequelize.QueryTypes.SELECT })
  .then(turnos => {
    if(turnos.length <= 0) return res.status(404).send({ message: `No hay Turnos disponibles con el Origen: ${origenId} y el Destino: ${destinoId}` })
    res.status(200).send({ turnos })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}


module.exports = {
  getTurno,
  getTurnos,
  getTurnosPorFecha
}
