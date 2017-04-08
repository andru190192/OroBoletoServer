'use strict'

const { Sequelize, sequelize } = require('./sequelizeConf')
const moment = require('moment')

const TurnoVehiculoSchema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Codigo para asignar el Turno al Vehiculo' },
      isNumeric: { args: true, msg: 'El Codigo para asignar el Turno al Vehiculo debe tener solo numeros' }
    }
  },

  turno: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe seleccionar un Codigo de Turno' }
    },
    set: function (valTurno) { return this.setDataValue('turno', valTurno.toUpperCase()) }
  },

  placa: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe seleccionar el Numero de Placa del Vehiculo' }
    },
    set: function (valPlaca) { return this.setDataValue('placa', valPlaca.toUpperCase()) }
  },

  diaSalida: {
    type: Sequelize.DATE,
    field: 'dia_salida',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar la Fecha de Salida para el Vehiculo que realizara el Turno' },
      isDate: { args: true, msg: 'Debe ingresar un formato valido para la Fecha de Salida del Vehiculo que realizara el Turno: YYYY-MM-DD' },
      isAfter: { args: moment().format('YYYY-MM-DD'), msg: 'La Fecha de Salida del Vehiculo que realizara el Turno debe ser posterior a la Fecha Actual' }
    },
    get: function () {
      console.log('La fecha actual es: ' + moment().format('YYYY-MM-DD'))
      return moment(this.getDataValue('diaSalida')).locale('es-ec').format('dddd, DD MMMM YYYY')
    },
    set: function (valDiaSalida) {
      return this.setDataValue('diaSalida', moment(valDiaSalida))
    }
  }
}

module.exports = sequelize.define(
  'turno_vehiculo',
  TurnoVehiculoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
