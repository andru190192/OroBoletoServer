'use strict'

const Cooperativa = require('../models/cooperativa')

function getCooperativa (req, res) {
  let cooperativaId = req.params.cooperativaId
  Cooperativa.findById(cooperativaId)
  .then(cooperativa => {
    if(!cooperativa) return res.status(404).send({ message: `La cooperativa ${cooperativaId} no existe` })
    res.status(200).send({ cooperativa })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getCooperativas (req, res) {
  Cooperativa.findAll()
  .then(cooperativas => {
    if(cooperativas.length <= 0) return res.status(404).send({ message: 'No existen cooperativas' })
    res.status(200).send({ cooperativas })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function saveCooperativa (req, res) {
  let cooperativa = req.body
  Cooperativa.create(cooperativa)
  .then(cooperativaStored => {
    res.status(200).send({ cooperativa: cooperativaStored })
  })
  .catch(err => res.status(500).send({ message: `Error al guardar la cooperativa en la base de datos: ${err}` }))
}

function updateCooperativa (req, res) {
  let cooperativaId = req.params.cooperativaId
  let cooperativa = req.body
  Cooperativa.update(cooperativa, { where: { codigo: cooperativaId }, returning: true })
  .then((cooperativaUpdate) => {
    if(cooperativaUpdate[0] <= 0) return res.status(404).send({ message: `La cooperativa ${cooperativaId} no existe` })
    res.status(200).send({ cooperativa: cooperativaUpdate[1] })
  })
  .catch(err => res.status(500).send({ message: `Error al actualizar la cooperativa en la base de datos: ${err}` }))
}

function deleteCooperativa (req, res) {
  let cooperativaId = req.params.cooperativaId
  Cooperativa.destroy({ where: { codigo: cooperativaId } })
  .then(cooperativaCountDelete => {
    if(cooperativaCountDelete <= 0) return res.status(404).send({ message: `La cooperativa ${cooperativaId} no existe` })
    res.status(200).send({ message: `La cooperativa ${cooperativaId} ha sido eliminada` })
  })
  .catch(err => res.status(500).send({ message: `Error al eliminar la cooperativa en la base de datos: ${err}` }))
}

module.exports = {
  getCooperativa,
  getCooperativas,
  saveCooperativa,
  updateCooperativa,
  deleteCooperativa
}
