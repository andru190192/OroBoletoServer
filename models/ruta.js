'use strict'

const { Sequelize, sequelize } = require('./sequelizeConf')
const moment = require('moment')

const RutaSchema = {
  cooperativa: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe seleccionar una Cooperativa para asignar la Ruta' }
    },
    set: function (valCooperativa) { return this.setDataValue('cooperativa', valCooperativa.toUpperCase()) }
  },

  origen: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar una Ciudad de Origen para la Ruta' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'La Ciudad de Origen para la Ruta debe tener solo letras' }
    },
    set: function (valOrigen) { return this.setDataValue('origen', valOrigen.toUpperCase()) }
  },

  destino: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar una Ciudad de Destino para la Ruta' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'La Ciudad de Destino para la Ruta debe tener solo letras' }
    },
    set: function (valDestino) { return this.setDataValue('destino', valDestino.toUpperCase()) }
  },

  tiempoViaje: {
    type: Sequelize.DATE,
    field: 'tiempo_viaje',
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Tiempo de Viaje estimado para la Ruta' },
      isDate: { args: true, msg: 'Debe ingresar un formato de hora valido: HH:mm' }
    },
    get: function () {
      if (this.getDataValue('tiempoViaje') !== undefined && this.getDataValue('tiempoViaje') !== null) {
        return moment(this.getDataValue('tiempoViaje'), 'EEE MMM dd yyyy HH:mm:ss (zzzz)').format('HH:mm')
      } else {
        return '00:00'
      }
    },
    set: function (valTiempo) {
      let fecha = moment().format(`YYYY-MM-DDT${valTiempo}:00Z`)
      let horas = moment(fecha).format('HH')
      if (parseInt(horas) < 1) throw new Error('Las Tiempo de Viaje estimado para la Ruta debe ser mayor a 1 hora')
      return this.setDataValue('tiempoViaje', `${fecha}`)
    }
  },

  paradas: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Paradas que se haran durante la Ruta' },
      isNumeric: { args: true, msg: 'El Numero de Paradas no debe tener letras' }
    },
    get: function () {
      if (this.getDataValue('paradas') !== undefined && this.getDataValue('paradas') !== null && this.getDataValue('paradas') > 0) {
        return this.getDataValue('paradas')
      } else {
        return 'No se realizara Ninguna Parada durante la Ruta'
      }
    }
  },

  valor: {
    type: Sequelize.DECIMAL(9, 2),
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Precio para la Ruta' },
      min: { args: 1, msg: 'El Precio para la Ruta debe ser mayor a cero' },
      isDecimal: { args: true, msg: 'El Precio para la Ruta debe tener solo numeros, ej: 10.00' }
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
