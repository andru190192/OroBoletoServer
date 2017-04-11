'use strict'

const { Sequelize, sequelize, isUnique, lenCedulaRuc } = require('./sequelizeConf')

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
    type: Sequelize.INTEGER,
    field: 'numero_asientos',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Asientos del Vehiculo' },
      isNumeric: { args: true, msg: 'El Numero de Asientos del Vehiculo no debe tener letras' },
      min: { args: 1, msg: 'El Numero de Asientos del Vehiculo debe ser mayor a cero' }
    }
  },

  numeroDisco: {
    type: Sequelize.INTEGER,
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
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Cedula o RUC del Chofer del Vehiculo' },
      isNumeric: { args: true, msg: 'El Numero de Cedula o RUC del Chofer no debe tener letras' },
      isLength: lenCedulaRuc(this.chofer)
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
