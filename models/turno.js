'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')
const moment = require('moment')

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
    allowNull: false,
    get: function() {
      return moment(this.getDataValue('horaSalida'), 'EEE MMM dd yyyy HH:mm:ss (zzzz)').format('HH:mm');
    }
  },

  horaLlegada: {
    type: Sequelize.STRING,
    field: 'hora_llegada',
    allowNull: false,
    get: function() {
      return moment(this.getDataValue('horaLlegada'), 'EEE MMM dd yyyy HH:mm:ss (zzzz)').format('HH:mm');
    }
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
