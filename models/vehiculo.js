'use strict'

const { Sequelize, sequelize, isUnique } = require('./sequelizeConf')

const VehiculoSchema = {
  placa: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Numero de Placa para el Vehiculo' },
      isUnique: isUnique('vehiculo', 'placa')
    },
    set: function (valPlaca) { return this.setDataValue('placa', valPlaca.toUpperCase()) }
  },

  tipo: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Nombre para el Tipo de Vehiculo' }
    },
    set: function (valTipo) { return this.setDataValue('tipo', valTipo.toUpperCase()) }
  },

  numeroAsientos: {
    type: Sequelize.STRING,
    field: 'numero_asientos',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Asientos que tiene el Vehiculo' },
      isNumeric: { args: true, msg: 'El Numero de Asientos no debe tener letras' }
    }
  },

  numeroDisco: {
    type: Sequelize.STRING,
    field: 'numero_disco',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Disco que tiene el Vehiculo' }
    }
  },

  chofer: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Cedula o RUC para el Chofer del Vehiculo' },
      isNumeric: { args: true, msg: 'El Numero de Cedula o RUC del Chofer no debe tener letras' },
      len: { args: [10, 13], msg: 'El Numero de Cedula debe tener 10 digitos o el RUC 13 digitos' }
    }
  }
}

module.exports = sequelize.define(
  'vehiculo',
  VehiculoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
