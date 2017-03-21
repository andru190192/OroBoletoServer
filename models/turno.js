'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const TurnoSchema = {
  codigo: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  cooperativa: { Sequelize.STRING, allowNull: false },
  origen: { Sequelize.STRING, allowNull: false },
  destino: { Sequelize.STRING, allowNull: false },
  horaSalida: { type: Sequelize.DATE, field: 'tiempo_viaje', allowNull: false },
  paradas: { Sequelize.STRING, allowNull: false },
  valor: { Sequelize.DECIMAL(9, 2), allowNull: false }
}

module.exports = sequelize.define(
  'truno',
  TurnoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
