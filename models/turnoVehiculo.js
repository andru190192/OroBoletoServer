'use strict'

const { Sequelize, sequelize } = require('./sequelizeConf')
const moment = require('moment')

const TurnoVehiculoSchema = {
  turno: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe seleccionar un Codigo de Turno' }
    },
    set: function (valTurno) { return this.setDataValue('turno', valTurno.toUpperCase()) }
  },

  placa: {
    type: Sequelize.STRING,
    primaryKey: true,
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
      return moment(this.getDataValue('diaSalida'), 'EEE MMM dd yyyy HH:mm:ss (zzzz)').locale('es-ec').format('dddd, DD MMMM YYYY')
    }
    // set: function (valDiaSalida) {
    //   let fecha = moment().format(`${valDiaSalida}THH:mm:ss:00Z`)
    //   console.log('La fecha de salida es: ' + this.setDataValue('diaSalida', `${fecha}`))
    //   return this.setDataValue('diaSalida', `${fecha}`)
    // }
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
