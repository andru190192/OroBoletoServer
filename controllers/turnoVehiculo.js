'use strict'

const TurnoVehiculo = require('../models/turnoVehiculo')
const Turno = require('../models/turno')
const Vehiculo = require('../models/vehiculo')

function getTurnoVehiculo (req, res) {
  let turnoId = req.params.turnoId
  let placaId = req.params.placaId
  let diaSalida = req.params.diaSalida
  TurnoVehiculo.findOne({ where: { turno: turnoId, placa: placaId, diaSalida: new Date(diaSalida) } })
  .then(turnoVehiculo => {
    if (!turnoVehiculo) return res.status(404).send({ message: `El Turno con el Codigo: '${turnoId}' para el Vehiculo con Placa: '${placaId}' y Fecha de Salida: ${diaSalida} no existe` })
    res.status(200).send({ turnoVehiculo })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getTurnosVehiculos (req, res) {
  let placaId = req.params.placaId
  TurnoVehiculo.findAll({ where: { placa: placaId } })
  .then(turnosVehiculos => {
    if (turnosVehiculos.length <= 0) return res.status(404).send({ message: `El Vehiculo con Placa: ${placaId} no tiene Turnos asignados` })
    res.status(200).send({ turnosVehiculos })
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
  let turnoId = req.params.turnoId
  let placaId = req.params.placaId
  let diaSalida = req.params.diaSalida
  let turnoVehiculo = req.body
  TurnoVehiculo.update(turnoVehiculo, { where: { turno: turnoId, placa: placaId, diaSalida: new Date(diaSalida) }, returning: true })
  .then((turnoVehiculoUpdate) => {
    if (turnoVehiculoUpdate[0] <= 0) return res.status(404).send({ message: `El Turno con el Codigo: '${turnoId}' para el Vehiculo con Placa: '${placaId}' y Fecha de Salida: ${diaSalida} no existe` })
    res.status(200).send({ turnoVehiculo: turnoVehiculoUpdate[1] })
  })
  .catch(err => res.status(500).send({ message: `Error al actualizar la asignacion del Turno con el Vehiculo en la base de datos: ${err}` }))
}

function deleteTurnoVehiculo (req, res) {
  let turnoId = req.params.turnoId
  let placaId = req.params.placaId
  let diaSalida = req.params.diaSalida
  TurnoVehiculo.destroy({ where: { turno: turnoId, placa: placaId, diaSalida: new Date(diaSalida) } })
  .then(turnoVehiculoCountDelete => {
    if (turnoVehiculoCountDelete <= 0) return res.status(404).send({ message: `El Turno con el Codigo: '${turnoId}' para el Vehiculo con Placa: '${placaId}' y Fecha de Salida: ${diaSalida} no existe` })
    res.status(200).send({ message: `La asignacion del Turno con el Codigo: ${turnoId} para el Vehiculo con Placa ${placaId} y Fecha de Salida: ${diaSalida} ha sido eliminada` })
  })
  .catch(err => res.status(500).send({ message: `Error al eliminar la asignacion del Turno con el Vehiculo en la base de datos: ${err}` }))
}

module.exports = {
  getTurnoVehiculo,
  getTurnosVehiculos,
  saveTurnoVehiculo,
  updateTurnoVehiculo,
  deleteTurnoVehiculo
}
