'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')
const moment = require('moment')

const TurnoSchema = {
  codigo: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un codigo para el turno' }
    },
    set: function(valCodigo) { return this.setDataValue('codigo', valCodigo.toUpperCase()) }
  },

  cooperativa: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el codigo de una cooperativa para asignar el turno' },
      is: { args: ['^[a-z ]+$','i'], msg: 'El codigo de la cooperativa debe tener solo letras' }
    },
    set: function(valCooperativa) { return this.setDataValue('cooperativa', valCooperativa.toUpperCase()) }
  },

  origen: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el nombre de la ciudad de origen' },
      is: { args: ['^[a-z ]+$','i'], msg: 'El nombre de la ciudad de origen debe tener solo letras' }
    },
    set: function(valOrigen) { return this.setDataValue('origen', valOrigen.toUpperCase()) }
  },

  destino: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el nombre de la ciudad de destino' },
      is: { args: ['^[a-z ]+$','i'], msg: 'El nombre de la ciudad de destino debe tener solo letras' }
    },
    set: function(valDestino) { return this.setDataValue('destino', valDestino.toUpperCase()) }
  },

  horaSalida: {
    type: Sequelize.DATE,
    field: 'hora_salida',
    allowNull: false,
    validate:{
      notEmpty: { args: true, msg: 'Debe ingresar la hora de salida del turno' },
      isDate: { args: true, msg: 'Debe ingresar un formato de hora de salida valido: hh:mm'},
    },
    get: function() {
      return moment(this.getDataValue('horaSalida'), 'EEE MMM dd yyyy HH:mm:ss (zzzz)').format('HH:mm');
    },
    set: function(valSalida){
        let hora = moment().format(`YYYY-MM-DDT${valSalida}:00Z`)
        return this.setDataValue('horaSalida', `${hora}`)
    }
  },

  horaLlegada: {
    type: Sequelize.STRING,
    field: 'hora_llegada',
    allowNull: false,
    validate:{
      notEmpty: { args: true, msg: 'Debe ingresar la hora de llegada del turno' },
      isDate: { args: true, msg: 'Debe ingresar un formato de hora de llegada valido: hh:mm'},
    },
    get: function() {
      return moment(this.getDataValue('horaLlegada'), 'EEE MMM dd yyyy HH:mm:ss (zzzz)').format('HH:mm');
    },
    set: function(valLlegada){
        let hora = moment().format(`YYYY-MM-DDT${valLlegada}:00Z`)
        return this.setDataValue('horaLlegada', `${hora}`)
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
