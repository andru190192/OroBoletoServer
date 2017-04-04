'use strict'

const config = require('../config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.db,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    // logging: true,
    timestamps: false,
    timezone: '-05:00'
  })

function isUnique (modelName, field) {
  return (value, next) => {
    const Model = require(`./${modelName}`)
    const query = {}
    query[field] = value
    Model.find({ where: query, attributes: [field] })
      .then(obj => {
        if (obj) next(`El ${field} '${value}' ya esta en uso. Debe ingresar otro ${field}`)
        next()
      })
  }
}

function lenCedulaRuc (cedulaRuc) {
  return (cedulaRuc, next) => {
    console.log('La cedula o ruc es: ' + cedulaRuc)
    if (parseInt(cedulaRuc.length) !== 10 && parseInt(cedulaRuc.length) !== 13) {
      next('El Numero de Cedula debe tener 10 digitos o el RUC 13 digitos')
    }
    next()
  }
}

module.exports = {
  Sequelize,
  sequelize,
  isUnique,
  lenCedulaRuc
}
