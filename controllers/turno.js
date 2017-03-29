'use strict'

const { sequelize } = require('../models/sequelizeConf')
const Turno = require('../models/turno')

function getTurno (req, res) {
  let codigoId = req.params.codigoId
  Turno.findOne({ where: { codigo: codigoId } })
  .then(turno => {
    if(!turno) return res.status(404).send({ message: `El turno con el Codigo: ${codigoId} no existe` })
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
    if(turnos.length <= 0) return res.status(404).send({ message: `La Cooperativa: ${cooperativaId} no tiene turnos con el Origen: ${origenId} y el Destino: ${destinoId}` })
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
    if(turnos.length <= 0) return res.status(404).send({ message: `No hay Turnos disponibles para la Fecha: ${fecha} con el Origen: ${origenId} y el Destino: ${destinoId}` })
    res.status(200).send({ turnos })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function saveTurno (req, res) {
  let turno = req.body
  Turno.create(turno)
  .then(turnoStored => {
    res.status(200).send({ turno: turnoStored })
  })
  .catch(err => res.status(500).send({ message: `Error al guardar la informacion de la ruta: ${err}` }))
}

module.exports = {
  getTurno,
  getTurnos,
  getTurnosPorFecha,
  saveTurno
}
