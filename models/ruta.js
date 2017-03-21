'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const RutaSchema = {
  cooperativa: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  origen: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  destino: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  tiempoViaje: { type: Sequelize.DATE, field: 'tiempo_viaje' },
  paradas: Sequelize.STRING,
  valor: { type: Sequelize.DECIMAL(9, 2), allowNull: false }
}

module.exports = sequelize.define(
  'ruta',
  RutaSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
