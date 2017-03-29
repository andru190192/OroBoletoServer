'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const TurnoSchema = {
  codigo: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },

  cooperativa: {
    type: Sequelize.STRING,
    allowNull: false
  },

  origen: {
    type: Sequelize.STRING,
    allowNull: false
  },

  destino: {
    type: Sequelize.STRING,
    allowNull: false
  },

  horaSalida: {
    type: Sequelize.DATE,
    field: 'hora_salida',
    allowNull: false
  },

  horaLlegada: {
    type: Sequelize.STRING,
    field: 'hora_llegada',
    allowNull: false
  },
}

module.exports = sequelize.define(
  'turno',
  TurnoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
