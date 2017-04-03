'use strict'

const { Sequelize, sequelize } = require('./sequelizeConf')

const TurnoVehiculoSchema = {
  turno: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  placa: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  diaSalida: { type: Sequelize.DATE, allowNull: false }
}

module.exports = sequelize.define(
  'turno_vehiculo',
  TurnoVehiculoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
