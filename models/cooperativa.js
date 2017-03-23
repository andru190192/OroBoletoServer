'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const CooperativaSchema = {
  codigo: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: { notEmpty: { args: true, msg: 'Ingrese un codigo para la Cooperativa' } },
    set: function(valCodigo) { return this.setDataValue('codigo', valCodigo.toUpperCase()) }
  },
  ruc: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: { args: true, msg: 'Ingrese solo numeros' },
      notEmpty: { args: true, msg: 'Ingrese un numero de RUC' },
      len: { args: 13, msg: 'El RUC debe tener 13 digitos' }
    }
  },
  nombre: {
    type: Sequelize.STRING, allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Ingrese un nombre para la Cooperativa' },
      is: { args: ["^[a-z]+$",'i'], msg: 'Ingrese solo letras' }
    },
    set: function(valNombre) { return this.setDataValue('nombre', valNombre.toUpperCase()) }
  },
  gerente: {
    type: Sequelize.STRING, allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Ingrese un nombre de Gerente' },
      is: { args: ["^[a-z]+$",'i'], msg: 'Ingrese solo letras' }
    },
    set: function(valGerente) { return this.setDataValue('gerente', valGerente.toUpperCase()) }
  },
  telefono: {
    type: Sequelize.STRING, allowNull: true, defaultValue: null,
    validate: {
      isNumeric: { args: true, msg: 'Ingrese solo numeros' },
      notEmpty: { args: true, msg: 'Ingrese un numero de telefono' }
    }
  },
  correo: Sequelize.STRING,
  matriz: Sequelize.STRING
}


module.exports = sequelize.define(
  'cooperativa',
  CooperativaSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
