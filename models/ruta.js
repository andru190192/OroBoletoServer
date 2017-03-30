'use strict'

const { Sequelize, sequelize } = require('./sequelizeConf')
const moment = require('moment');

const RutaSchema = {
  cooperativa: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe seleccionar una cooperativa para asignar la ruta' }
    },
    set: function(valCooperativa) { return this.setDataValue('cooperativa', valCooperativa.toUpperCase()) }
  },

  origen: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar una ciudad de origen' },
      is: { args: ['^[a-z ]+$','i'], msg: 'La ciudad de origen debe tener solo letras' }
    },
    set: function(valOrigen) { return this.setDataValue('origen', valOrigen.toUpperCase()) }
  },

  destino: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar una ciudad de destino' },
      is: { args: ['^[a-z ]+$','i'], msg: 'La ciudad de destino debe tener solo letras' }
    },
    set: function(valDestino) { return this.setDataValue('destino', valDestino.toUpperCase()) }
  },

  tiempoViaje: {
    type: Sequelize.DATE,
    field: 'tiempo_viaje',
    allowNull: true,
    defaultValue: null,
    validate:{
      notEmpty: { args: true, msg: 'Debe ingresar el tiempo estimado de viaje' },
      isDate: { args: true, msg: 'Debe ingresar un formato de hora valida: hh:mm'},
    },
    get: function() {
      if(this.getDataValue('tiempoViaje') !== undefined && this.getDataValue('tiempoViaje') !== null)
        return moment(this.getDataValue('tiempoViaje'), 'EEE MMM dd yyyy HH:mm:ss (zzzz)').format('HH:mm')
      else
        return '00:00'
    },
    set: function(valTiempo){
        let fecha = moment().format(`YYYY-MM-DDT${valTiempo}:00Z`)
        return this.setDataValue('tiempoViaje', `${fecha}`)
    }
  },

  paradas: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate:{
      notEmpty: { args: true, msg: 'Debe ingresar el numero de paradas que se haran durante la ruta' },
      isNumeric: { args: true, msg: 'El numero de paradas no debe tener letras' },
    },
    get: function() {
      if(this.getDataValue('paradas') !== undefined && this.getDataValue('paradas') !== null && this.getDataValue('paradas')>0)
        return this.getDataValue('paradas')
      else
        return 'No se realizara ninguna parada durante la ruta'
    }
  },

  valor: {
    type: Sequelize.DECIMAL(9, 2),
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el precio del boleto' },
      is: { args: ['^[0-9.]+$','i'], msg: 'El precio del boleto debe tener solo numeros, ej: 10.00' }
    }
  }
}

module.exports = sequelize.define(
  'ruta',
  RutaSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
