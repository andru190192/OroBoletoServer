'use strict'

const Boleto = require('../models/boleto')

function getBoleto (req, res) {
  let boletoId = req.params.boletoId
  Boleto.findById(boletoId)
  .then(boleto => {
    if(!boleto) return res.status(404).send({ message: `El Boleto con el Codigo '${boletoId}' no existe` })
    res.status(200).send({ boleto })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getBoletos (req, res) {
  let clienteId = req.params.clienteId
  Boleto.findAll({ where: { cliente: clienteId } })
  .then(boletos => {
    if(boletos.length <= 0) return res.status(404).send({ message: `El cliente con numero de identificacion: ${clienteId} no tiene boletos` })
    res.status(200).send({ boletos })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}


module.exports = {
  getBoleto,
  getBoletos
}
