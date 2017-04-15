'use strict'

const { Sequelize, sequelize } = require('./sequelizeConf')
const moment = require('moment')

const TurnoSchema = {
  codigo: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Codigo para el Turno' }
    },
    set: function (valCodigo) { return this.setDataValue('codigo', valCodigo.toUpperCase()) }
  },

  cooperativa: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe seleccionar una Cooperativa para asignar el Turno' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'El Codigo de la Cooperativa debe tener solo letras' }
    },
    set: function (valCooperativa) { return this.setDataValue('cooperativa', valCooperativa.toUpperCase()) }
  },

  origen: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe seleccionar el Nombre de la Ciudad de Origen para el Turno' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'El Nombre de la Ciudad de Origen para el Turno debe tener solo letras' }
    },
    set: function (valOrigen) { return this.setDataValue('origen', valOrigen.toUpperCase()) }
  },

  destino: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe seleccionar el Nombre de la Ciudad de Destino para el Turno' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'El Nombre de la Ciudad de Destino para el Turno debe tener solo letras' }
    },
    set: function (valDestino) { return this.setDataValue('destino', valDestino.toUpperCase()) }
  },

  horaSalida: {
    type: Sequelize.DATE,
    field: 'hora_salida',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar la Hora de Salida para el Turno' },
      isDate: { args: true, msg: 'Debe ingresar un formato de Hora de Salida valido: HH:mm' }
    },
    get: function () {
      return moment(this.getDataValue('horaSalida'), 'EEE MMM dd yyyy HH:mm:ss (zzzz)').format('HH:mm')
    },
    set: function (valSalida) {
      let hora = moment().format(`YYYY-MM-DDT${valSalida}:00Z`)
      return this.setDataValue('horaSalida', `${hora}`)
    }
  },

  horaLlegada: {
    type: Sequelize.DATE,
    field: 'hora_llegada',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar la Hora de Llegada para el Turno' },
      isDate: { args: true, msg: 'Debe ingresar un formato de Hora de Llegada valido: HH:mm' }
    },
    get: function () {
      return moment(this.getDataValue('horaLlegada'), 'EEE MMM dd yyyy HH:mm:ss (zzzz)').format('HH:mm')
    },
    set: function (valLlegada) {
      let hora = moment().format(`YYYY-MM-DDT${valLlegada}:00Z`)
      return this.setDataValue('horaLlegada', `${hora}`)
    }
  }
}

module.exports = sequelize.define(
  'turno',
  TurnoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
