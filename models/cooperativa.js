'use strict'

const { Sequelize, sequelize, isUnique } = require('./sequelizeConf')

const CooperativaSchema = {
  codigo: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Codigo para la Cooperativa' },
      isUnique: isUnique('cooperativa', 'codigo'),
      len: { args: [3, 5], msg: 'El Codigo de la Cooperativa debe tener de 3 a 5 caracteres' }
    },
    set: function (valCodigo) { return this.setDataValue('codigo', valCodigo.toUpperCase()) }
  },

  ruc: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de RUC para la Cooperativa' },
      isNumeric: { args: true, msg: 'El RUC de la Cooperativa debe tener solo numeros' },
      len: { args: 13, msg: 'El RUC de la Cooperativa debe tener 13 digitos' },
      isUnique: isUnique('cooperativa', 'ruc')
    }
  },

  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Nombre para la Cooperativa' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'El Nombre de la Cooperativa debe tener solo letras' }
    },
    set: function (valNombre) { return this.setDataValue('nombre', valNombre.toUpperCase()) }
  },

  gerente: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Nombre del Gerente de la Cooperativa' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'El Nombre del Gerente de la Cooperativa debe tener solo letras' }
    },
    set: function (valGerente) { return this.setDataValue('gerente', valGerente.toUpperCase()) }
  },

  telefono: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Numero de Telefono para la Cooperativa' },
      isNumeric: { args: true, msg: 'El Numero de Telefono para la Cooperativa no debe tener letras' },
      len: { args: [9, 10], msg: 'El Numero de Telefono de la Cooperativa debe tener de 9 a 10 caracteres' }
    }
  },

  correo: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Correo Electronico para la Cooperativa' },
      isEmail: { args: true, msg: 'El Correo Electronico ingresado no es valido' },
      isUnique: isUnique('cooperativa', 'correo')
    },
    set: function (valCorreo) { return this.setDataValue('correo', valCorreo.toLowerCase()) }
  },

  matriz: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar la Direccion de la oficina matriz de la Cooperativa' }
    },
    set: function (valMatriz) { return this.setDataValue('matriz', valMatriz.toUpperCase()) }
  }
}

module.exports = sequelize.define(
  'cooperativa',
  CooperativaSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
