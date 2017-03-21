'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const CooperativaSchema = {
  codigo: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  ruc: { type: Sequelize.STRING, allowNull: false },
  nombre: { type: Sequelize.STRING, allowNull: false },
  gerente: { type: Sequelize.STRING, allowNull: false },
  telefono: Sequelize.STRING,
  correo: Sequelize.STRING,
  matriz: Sequelize.STRING
}

module.exports = sequelize.define(
  'cooperativa',
  CooperativaSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
