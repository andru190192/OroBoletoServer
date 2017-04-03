'use strict'

const Boleto = require('../models/boleto')
const FormaPago = require('../models/formaPago')

function getBoleto (req, res) {
  let boletoId = req.params.boletoId
  Boleto.findById(boletoId)
  .then(boleto => {
    if (!boleto) return res.status(404).send({ message: `El Boleto con el Codigo '${boletoId}' no existe` })
    res.status(200).send({ boleto })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getBoletos (req, res) {
  let clienteId = req.params.clienteId
  Boleto.findAll({ where: { cliente: clienteId } })
  .then(boletos => {
    if (boletos.length <= 0) return res.status(404).send({ message: `El cliente con numero de identificacion: ${clienteId} no tiene boletos` })
    res.status(200).send({ boletos })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function saveBoleto (req, res) {
  let boleto = req.body
  let formaPagoId = boleto.formaPago
  let clienteId = boleto.cliente
  FormaPago.findOne({ where: { id: formaPagoId, cliente: clienteId } })
  .then(formaPago => {
    if (!formaPago) {
      return res.status(404).send({ message: `El Cliente con el Numero de Identificacion: ${clienteId} no tiene la Forma de Pago con el Codigo ${formaPagoId}` })
    } else {
      Boleto.create(boleto)
      .then(boletoStored => {
        res.status(200).send({ boleto: boletoStored })
      })
      .catch(err => res.status(500).send({ message: `Error al guardar el Boleto en la base de datos: ${err}` }))
    }
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function updateBoleto (req, res) {
  let boletoId = req.params.boletoId
  let boleto = req.body
  Boleto.update(boleto, { where: { numero_factura: boletoId }, returning: true })
  .then((boletoUpdate) => {
    if (boletoUpdate[0] <= 0) return res.status(404).send({ message: `La Boleto con el Codigo: ${boletoId} no existe` })
    res.status(200).send({ boleto: boletoUpdate[1] })
  })
  .catch(err => res.status(500).send({ message: `Error al actualizar el Boleto en la base de datos: ${err}` }))
}

function deleteBoleto (req, res) {
  let boletoId = req.params.boletoId
  Boleto.destroy({ where: { numero_factura: boletoId } })
  .then(boletoCountDelete => {
    if (boletoCountDelete <= 0) return res.status(404).send({ message: `El boleto con el Codigo ${boletoId} no existe` })
    res.status(200).send({ message: `El Boleto con el Codigo: ${boletoId} ha sido eliminado` })
  })
  .catch(err => res.status(500).send({ message: `Error al eliminar el Boleto de la base de datos: ${err}` }))
}

module.exports = {
  getBoleto,
  getBoletos,
  saveBoleto,
  updateBoleto,
  deleteBoleto
}
