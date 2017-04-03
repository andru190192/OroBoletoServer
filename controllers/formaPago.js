'use strict'

const FormaPago = require('../models/formaPago')
const Persona = require('../models/persona')

function getFormaPago (req, res) {
  let formaPagoId = req.params.formaPagoId
  FormaPago.findById(formaPagoId)
  .then(formaPago => {
    if (!formaPago) return res.status(404).send({ message: `La forma de pago '${formaPagoId}' no existe` })
    res.status(200).send({ formaPago })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function getFormasPagos (req, res) {
  let clienteId = req.params.clienteId
  FormaPago.findAll({ where: { cliente: clienteId } })
  .then(formasPago => {
    if (formasPago.length <= 0) return res.status(404).send({ message: `El cliente: ${clienteId} no tiene formas de pago` })
    res.status(200).send({ formasPago })
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function saveFormaPago (req, res) {
  let formaPago = req.body
  let clienteId = formaPago.cliente
  Persona.findOne({ where: { cedula_ruc: clienteId } })
  .then(persona => {
    if (!persona) {
      return res.status(404).send({ message: `El Cliente con el numero de identificacion ${clienteId} no existe` })
    } else {
      FormaPago.create(formaPago)
      .then(formaPagoStored => {
        res.status(200).send({ formaPago: formaPagoStored })
      })
      .catch(err => res.status(500).send({ message: `Error al guardar la forma de pago en la base de datos: ${err}` }))
    }
  })
  .catch(err => res.status(500).send({ message: `Error al realizar la consulta: ${err}` }))
}

function updateFormaPago (req, res) {
  let formaPagoId = req.params.formaPagoId
  let formaPago = req.body
  FormaPago.update(formaPago, { where: { id: formaPagoId }, returning: true })
  .then((formaPagoUpdate) => {
    if (formaPagoUpdate[0] <= 0) return res.status(404).send({ message: `La forma de pago ${formaPagoId} no existe` })
    res.status(200).send({ formaPago: formaPagoUpdate[1] })
  })
  .catch(err => res.status(500).send({ message: `Error al actualizar la Forma de Pago en la base de datos: ${err}` }))
}

function deleteFormaPago (req, res) {
  let formaPagoId = req.params.formaPagoId
  FormaPago.destroy({ where: { id: formaPagoId } })
  .then(formaPagoCountDelete => {
    if (formaPagoCountDelete <= 0) return res.status(404).send({ message: `La forma de pago ${formaPagoId} no existe` })
    res.status(200).send({ message: `La forma de pago ${formaPagoId} ha sido eliminada` })
  })
  .catch(err => res.status(500).send({ message: `Error al eliminar la Forma de Pago en la base de datos: ${err}` }))
}

module.exports = {
  getFormaPago,
  getFormasPagos,
  saveFormaPago,
  updateFormaPago,
  deleteFormaPago
}