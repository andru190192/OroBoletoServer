'use strict'

const { sequelize } = require('../models/sequelizeConf')
const TurnoVehiculo = require('../models/turnoVehiculo')
const Turno = require('../models/turno')
const Vehiculo = require('../models/vehiculo')
const Persona = require('../models/persona')

function getTurnoVehiculo (req, res) {
  let turnoVehiculoId = req.params.turnoVehiculoId
  TurnoVehiculo.findOne({ where: { id: turnoVehiculoId } })
  .then(turnoVehiculo => {
    if (!turnoVehiculo) return res.status(404).send({ message: `El Codigo: ${turnoVehiculoId} para el Detalle de Turno - Vehiculo no existe` })
    res.status(200).send({ turnoVehiculo })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getTurnosVehiculos (req, res) {
  let turnoId = req.params.turnoId
  TurnoVehiculo.findAll({ where: { turno: turnoId } })
  .then(turnosVehiculos => {
    if (turnosVehiculos.length <= 0) return res.status(404).send({ message: `El Turno con Codigo: ${turnoId} no esta asignado a ningun Vehiculo` })
    res.status(200).send({ turnosVehiculos })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getTurnosVehiculoPorFecha (req, res) {
  let turnoId = req.params.turnoId.toUpperCase()
  let fecha = req.params.fecha
  sequelize.query(`SELECT * FROM oroticket.fun_vehiculo_asientos('${turnoId}', '${fecha}');`, { type: sequelize.QueryTypes.SELECT })
  .then(vehiculoAsientos => {
    if (vehiculoAsientos.length <= 0) return res.status(404).send({ message: `No hay Vehiculo disponibles para la Fecha: ${fecha} con el Turno: ${turnoId}` })
    vehiculoAsientos = vehiculoAsientos[0]
    Persona.findById(vehiculoAsientos.chofer)
    .then(chofer => {
      if (!chofer) return res.status(404).send({ message: `El chofer con el numero de identificacion '${vehiculoAsientos.chofer}' no existe` })
      vehiculoAsientos.chofer = chofer
      res.status(200).send({ vehiculoAsientos })
    })
    .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function saveTurnoVehiculo (req, res) {
  let turnoVehiculo = req.body
  let turnoId = turnoVehiculo.turno
  let placaId = turnoVehiculo.placa
  Turno.findById(turnoId)
  .then(turno => {
    if (!turno) {
      return res.status(404).send({ message: `El Turno con el Codigo: ${turnoId} no existe` })
    } else {
      Vehiculo.findById(placaId)
      .then(vehiculo => {
        if (!vehiculo) {
          return res.status(404).send({ message: `El Vehiculo con la Placa: ${placaId} no existe` })
        } else {
          TurnoVehiculo.create(turnoVehiculo)
          .then(turnoVehiculoStored => {
            res.status(200).send({ turnoVehiculo: turnoVehiculoStored })
          })
          .catch(err => res.status(500).send({ message: `Error al guardar el Turno del Vehiculo en la base de datos: ${err}` }))
        }
      })
      .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
    }
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function updateTurnoVehiculo (req, res) {
  let turnoVehiculoId = req.params.turnoVehiculoId
  let turnoVehiculo = req.body
  TurnoVehiculo.update(turnoVehiculo, { where: { id: turnoVehiculoId }, returning: true })
  .then((turnoVehiculoUpdate) => {
    if (turnoVehiculoUpdate[0] <= 0) return res.status(404).send({ message: `El Codigo: ${turnoVehiculoId} para el Detalle de Turno - Vehiculo no existe` })
    res.status(200).send({ turnoVehiculo: turnoVehiculoUpdate[1] })
  })
  .catch(err => res.status(500).send({ message: `Error al actualizar la asignacion del Turno con el Vehiculo en la base de datos: ${err}` }))
}

function deleteTurnoVehiculo (req, res) {
  let turnoVehiculoId = req.params.turnoVehiculoId
  TurnoVehiculo.destroy({ where: { id: turnoVehiculoId } })
  .then(turnoVehiculoCountDelete => {
    if (turnoVehiculoCountDelete <= 0) return res.status(404).send({ message: `El Codigo: ${turnoVehiculoId} para el Detalle de Turno - Vehiculo no existe` })
    res.status(200).send({ message: `La asignacion de Turno - Vehiculo con el Codigo: ${turnoVehiculoId} ha sido eliminada` })
  })
  .catch(err => res.status(500).send({ message: `Error al eliminar la asignacion del Turno con el Vehiculo en la base de datos: ${err}` }))
}

module.exports = {
  getTurnoVehiculo,
  getTurnosVehiculos,
  getTurnosVehiculoPorFecha,
  saveTurnoVehiculo,
  updateTurnoVehiculo,
  deleteTurnoVehiculo
}
