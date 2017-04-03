'use strict'

const Vehiculo = require('../models/vehiculo')
const Persona = require('../models/persona')

function getVehiculo (req, res) {
  let vehiculoId = req.params.vehiculoId
  Vehiculo.findById(vehiculoId)
  .then(vehiculo => {
    if (!vehiculo) return res.status(404).send({ message: `El Vehiculo con Placa '${vehiculoId}' no existe` })
    res.status(200).send({ vehiculo })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getVehiculos (req, res) {
  let choferId = req.params.choferId
  Vehiculo.findAll({ where: { chofer: choferId } })
  .then(vehiculos => {
    if (vehiculos.length <= 0) return res.status(404).send({ message: `El Chofer con Numero de Identificacion: ${choferId} no tiene vehiculos asignados` })
    res.status(200).send({ vehiculos })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function saveVehiculo (req, res) {
  let vehiculo = req.body
  let choferId = vehiculo.chofer
  Persona.findOne({ where: { cedula_ruc: choferId } })
  .then(persona => {
    if (!persona) {
      return res.status(404).send({ message: `El Chofer con el Numero de Identificacion ${choferId} no esta registrado` })
    } else {
      Vehiculo.create(vehiculo)
      .then(vehiculoStored => {
        res.status(200).send({ vehiculo: vehiculoStored })
      })
      .catch(err => res.status(500).send({ message: `Error al guardar el Vehiculo en la base de datos: ${err}` }))
    }
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function updateVehiculo (req, res) {
  let vehiculoId = req.params.vehiculoId
  let vehiculo = req.body
  Vehiculo.update(vehiculo, { where: { placa: vehiculoId }, returning: true })
  .then((vehiculoUpdate) => {
    if (vehiculoUpdate[0] <= 0) return res.status(404).send({ message: `El Vehiculo con Placa ${vehiculoId} no existe` })
    res.status(200).send({ vehiculo: vehiculoUpdate[1] })
  })
  .catch(err => res.status(500).send({ message: `Error al actualizar el Vehiculo en la base de datos: ${err}` }))
}

function deleteVehiculo (req, res) {
  let vehiculoId = req.params.vehiculoId
  Vehiculo.destroy({ where: { placa: vehiculoId } })
  .then(vehiculoCountDelete => {
    if (vehiculoCountDelete <= 0) return res.status(404).send({ message: `El Vehiculo con Placa ${vehiculoId} no existe` })
    res.status(200).send({ message: `El Vehiculo con Placa ${vehiculoId} ha sido eliminado` })
  })
  .catch(err => res.status(500).send({ message: `Error al eliminar el Vehiculo en la base de datos: ${err}` }))
}

module.exports = {
  getVehiculo,
  getVehiculos,
  saveVehiculo,
  updateVehiculo,
  deleteVehiculo
}
