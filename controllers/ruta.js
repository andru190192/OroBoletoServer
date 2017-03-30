'use strict'

const {sequelize} = require('../models/sequelizeConf')
const Ruta = require('../models/ruta')
const Cooperativa = require('../models/cooperativa')

function getRuta (req, res) {
  let cooperativaId = req.params.cooperativaId
  let origenId = req.params.origenId
  let destinoId = req.params.destinoId
  Ruta.findOne({ where: { cooperativa: cooperativaId, origen: origenId, destino:  destinoId } })
  .then(ruta => {
    if(!ruta) return res.status(404).send({ message: `La Cooperativa '${cooperativaId}' no tiene la ruta con el Origen: '${origenId}' y el Destino: '${destinoId}'` })
    res.status(200).send({ ruta })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getRutas (req, res) {
  let cooperativaId = req.params.cooperativaId
  Ruta.findAll({ where: { cooperativa: cooperativaId } })
  .then(rutas => {
    if(rutas.length <= 0) return res.status(404).send({ message: `La Cooperativa '${cooperativaId}' no tiene rutas` })
    res.status(200).send({ rutas })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getCiudadOrigen (req, res) {
  sequelize.query('SELECT * FROM oroticket.fun_ciudad_origen();', { type: sequelize.QueryTypes.SELECT })
  .then(ciudades => {
    if(ciudades.length <= 0) return res.status(404).send({ message: `No hay Ciudadades de Origen` })
    res.status(200).send({ ciudades })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getCiudadDestino (req, res) {
  let origenId = req.params.origenId.toUpperCase()
  sequelize.query(`SELECT * FROM oroticket.fun_ciudad_destino('${origenId}');`, { type: sequelize.QueryTypes.SELECT })
  .then(ciudades => {
    if(ciudades.length <= 0) return res.status(404).send({ message: `No hay Ciudadades de Destino con el Origen: ${origenId}` })
    res.status(200).send({ ciudades })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function saveRuta (req, res) {
  let ruta = req.body
  let cooperativaId = ruta.cooperativa
  Cooperativa.findOne({ where: { codigo: cooperativaId } })
  .then(cooperativa => {
    if(!cooperativa)
      return res.status(404).send({ message: `No puede crear la ruta porque la  Cooperativa con Codigo ${cooperativaId} no existe` })
    else{
      Ruta.create(ruta)
      .then(rutaStored => {
        res.status(200).send({ ruta: rutaStored })
      })
      .catch(err => res.status(500).send({ message: `Error al guardar la informacion de la ruta: ${err}` }))
    }
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function updateRuta (req, res) {
  let cooperativaId = req.params.cooperativaId
  let origenId = req.params.origenId
  let destinoId = req.params.destinoId
  let ruta = req.body
  Ruta.update(ruta, { where: { cooperativa: cooperativaId, origen: origenId, destino:  destinoId }, returning: true })
  .then((rutaUpdate) => {
    if(rutaUpdate[0] <= 0) return res.status(404).send({ message: `La ruta con el Origen: ${origenId} y el Destino: ${destinoId} de la Cooperativa: ${cooperativaId} no existe` })
    res.status(200).send({ ruta: rutaUpdate[1] })
  })
  .catch(err => res.status(500).send({ message: `Error al actualizar la informacion de la ruta en la base de datos: ${err}` }))
}

function deleteRuta (req, res) {
  let cooperativaId = req.params.cooperativaId
  let origenId = req.params.origenId
  let destinoId = req.params.destinoId
  Ruta.destroy({ where: { cooperativa: cooperativaId, origen: origenId, destino:  destinoId } })
  .then(rutaCountDelete => {
    if(rutaCountDelete <= 0) return res.status(404).send({ message: `La ruta con el Origen: ${origenId} y Destino: ${destinoId} de la Cooperativa: ${cooperativaId} no existe` })
    res.status(200).send({ message: `La ruta '${origenId} - ${destinoId} de la cooperativa ${cooperativaId}' ha sido eliminada` })
  })
  .catch(err => res.status(500).send({ message: `Error al eliminar la informacion de la ruta en la base de datos: ${err}` }))
}

module.exports = {
  getRuta,
  getRutas,
  getCiudadOrigen,
  getCiudadDestino,
  saveRuta,
  updateRuta,
  deleteRuta
}
