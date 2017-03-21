'use strict'

const Cooperativa = require('../models/cooperativa')

function getCooperativa (req, res) {
  let cooperativaId = req.params.cooperativaId

  res.status(200).send({ cooperativaId })
}

function getCooperativas (req, res) {
  Cooperativa.findAll()
    .then(cooperativas => {
      if(!cooperativas) return res.status(404).send({ message: 'No existen cooperativas' })
      console.log(cooperativas)
      res.status(200).send({ cooperativas })
    })
    .catch(err => res.status(500).send({ message: `Error al realizar la peticion: ${err}` }))
}

function saveCooperativa (req, res) {

}

function updateCooperativa (req, res) {

}

function deleteCooperativa (req, res) {

}


module.exports = {
  getCooperativa,
  getCooperativas,
  saveCooperativa,
  updateCooperativa,
  deleteCooperativa
}
