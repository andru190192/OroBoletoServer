'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const CooperativaSchema = {
  codigo: { type: Sequelize.STRING, primaryKey: true },
  ruc: Sequelize.STRING,
  nombre: Sequelize.STRING,
  gerente: Sequelize.STRING,
  telefono: Sequelize.STRING,
  correo: Sequelize.STRING,
  matriz: Sequelize.STRING
}

module.exports = sequelize.define(
  'cooperativa',
  CooperativaSchema,
  {
    schema: 'prueba',
    freezeTableName: true,
    timestamps: false
  })
