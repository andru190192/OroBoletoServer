'use strict'

const Cooperativa = require('../models/cooperativa')

function getCooperativa (req, res) {
  let cooperativaId = req.params.cooperativaId
  Cooperativa.findById(cooperativaId)
  .then(cooperativa => {
      if(!cooperativa) return res.status(404).send({ message: 'La cooperativa no existe' })
      res.status(200).send({ cooperativa })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la peticion: ${err}` }))
}

function getCooperativas (req, res) {
  Cooperativa.findAll()
  .then(cooperativas => {
      if(!cooperativas) return res.status(404).send({ message: 'No existen cooperativas' })
      res.status(200).send({ cooperativas })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la peticion: ${err}` }))
}

function saveCooperativa (req, res) {
  console.log(req.body)

  let cooperativa = new Cooperativa()
  cooperativa.codigo = req.body.codigo

  Cooperativa.create(cooperativa)
  .then((cooperativaStored) => {
      res.status(200).send({ cooperativa: cooperativaStored })
  })
  .catch(err => res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` }))
}

function updateCooperativa (req, res) {
  let cooperativaId = req.params.cooperativaId
  let cooperativa = req.body
  Cooperativa.update(cooperativa, {
    where: {
      codigo: cooperativaId
    }
  })
  .then(cooperativaUpdate => {
    console.log(`1: ${cooperativaUpdate}`);
  })
  .then(cooperativaUpdate => {
    console.log(`2: ${cooperativaUpdate}`);
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la peticion: ${err}` }))
}

function deleteCooperativa (req, res) {
  let cooperativaId = req.params.cooperativaId
  Cooperativa.destroy({
    where: {
      codigo: cooperativaId
    }
  })
  .then(cooperativaDelete => {
    console.log(`1: ${cooperativaUpdate}`);
  })
  .then(cooperativaDelete => {
    console.log(`2: ${cooperativaUpdate}`);
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la peticion: ${err}` }))
}

module.exports = {
  getCooperativa,
  getCooperativas,
  saveCooperativa,
  updateCooperativa,
  deleteCooperativa
}
