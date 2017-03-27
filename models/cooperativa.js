'use strict'

const {Sequelize, sequelize, isUnique} = require('./sequelizeConf')

const CooperativaSchema = {
  codigo: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un codigo para la Cooperativa' } ,
      isUnique: isUnique('cooperativa', 'codigo')
    },
    set: function(valCodigo) { return this.setDataValue('codigo', valCodigo.toUpperCase()) }
  },

  ruc: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un numero de RUC para la Cooperativa' },
      isNumeric: { args: true, msg: 'El RUC de la cooperativa debe tener solo numeros' },
      len: { args: [13,13], msg: 'El RUC de la Cooperativa debe tener 13 digitos' },
      isUnique: isUnique('cooperativa', 'ruc')
    }
  },

  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un nombre para la Cooperativa' },
      is: { args: ['^[a-z ]+$','i'], msg: 'El nombre de la Cooperativa debe tener solo letras' }
    },
    set: function(valNombre) { return this.setDataValue('nombre', valNombre.toUpperCase()) }
  },

  gerente: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un nombre de Gerente' },
      is: { args: ['^[a-z ]+$','i'], msg: 'El nombre del Gerente debe tener solo letras' }
    },
    set: function(valGerente) { return this.setDataValue('gerente', valGerente.toUpperCase()) }
  },

  telefono: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un numero de telefono' },
      isNumeric: { args: true, msg: 'El numero de telefono debe tener solo numeros' }
    }
  },

  correo: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un correo electronico' },
      isEmail: { args: true, msg: 'El correo electronico ingresado no es valido' },
      isUnique: isUnique('cooperativa', 'correo')
    },
    set: function(valCorreo) { return this.setDataValue('correo', valCorreo.toLowerCase()) }
  },
  
  matriz: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar la direccion de la oficina matriz de la cooperativa' }
    },
    set: function(valMatriz) { return this.setDataValue('matriz', valMatriz.toUpperCase()) }
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
