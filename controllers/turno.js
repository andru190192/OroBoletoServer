'use strict'

const { sequelize } = require('../models/sequelizeConf')
const Ruta = require('../models/ruta')
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
  let cooperativaId = turno.cooperativa.toUpperCase()
  let origenId = turno.origen.toUpperCase()
  let destinoId = turno.destino.toUpperCase()
  Ruta.findOne({ where: { cooperativa: cooperativaId, origen: origenId, destino: destinoId} })
  .then(ruta => {
    if(!ruta)
      return res.status(404).send({ message: `La Cooperativa '${cooperativaId}' no tiene una ruta con el Origen: '${origenId}' y el Destino: '${destinoId}'` })
    else {
      Turno.create(turno)
      .then(turnoStored => {
        res.status(200).send({ turno: turnoStored })
      })
      .catch(err => res.status(500).send({ message: `Error al guardar la informacion de la ruta: ${err}` }))
    }
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function updateTurno (req, res) {
  let turnoId = req.params.turnoId
  let turno = req.body
  Turno.update(turno, { where: { codigo: turnoId }, returning: true })
  .then((turnoUpdate) => {
    if(turnoUpdate[0] <= 0) return res.status(404).send({ message: `El turno ${turnoId} no existe` })
    res.status(200).send({ turno: turnoUpdate[1] })
  })
  .catch(err => res.status(500).send({ message: `Error al actualizar el turno en la base de datos: ${err}` }))
}

function deleteTurno (req, res) {
  let turnoId = req.params.turnoId
  Turno.destroy({ where: { codigo: turnoId } })
  .then(turnoCountDelete => {
    if(turnoCountDelete <= 0) return res.status(404).send({ message: `El turno ${turnoId} no existe` })
    res.status(200).send({ message: `El turno ${turnoId} ha sido eliminado` })
  })
  .catch(err => res.status(500).send({ message: `Error al eliminar el turno en la base de datos: ${err}` }))
}

module.exports = {
  getTurno,
  getTurnos,
  getTurnosPorFecha,
  saveTurno,
  updateTurno,
  deleteTurno
}
