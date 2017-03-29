'use strict'

const { Sequelize, sequelize } = require('./sequelizeConf')

const RutaSchema = {
  cooperativa: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe seleccionar una cooperativa para asignar la ruta' }
    }
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
      isDate: { args: true, msg: 'Debe ingresar un formato de fecha y hora valida'},
    },
    get: function() { return this.getDataValue('tiempoViaje').toISOString().slice(11,16) }
    //set: function(valNombre) { return this.setDataValue('nombre', valNombre.toUpperCase()) }
  },

  paradas: {
    type: Sequelize.STRING
  },

  valor: {
    type: Sequelize.DECIMAL(9, 2),
    allowNull: false
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
