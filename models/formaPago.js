'use strict'

const { Sequelize, sequelize, isUnique } = require('./sequelizeConf')
const moment = require('moment')

const FormaPagoSchema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Codigo para la Forma de Pago' }
    }
  },

  cliente: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Numero de Cedula o RUC del cliente' },
      isNumeric: { args: true, msg: 'La Cedula o RUC del cliente debe tener solo numeros' },
      len: { args: [10, 13], msg: 'El Numero de Cedula debe tener 10 digitos o el RUC 13 digitos' }
    }
  },

  tipo: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Tipo para la Forma de Pago' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'El Tipo para la Forma de Pago debe tener solo letras' }
    },
    set: function (valTipo) { return this.setDataValue('tipo', valTipo.toUpperCase()) }
  },

  nombreTarjeta: {
    type: Sequelize.STRING,
    field: 'nombre_tarjeta',
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Nombre de la Tarjeta de Credito' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'El Nombre de la Tarjeta de Credito debe tener solo letras' }
    },
    set: function (valTarjeta) { return this.setDataValue('nombreTarjeta', valTarjeta.toUpperCase()) }
  },

  numeroTarjeta: {
    type: Sequelize.STRING,
    field: 'numero_tarjeta',
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de la Tarjeta de Credito' },
      isNumeric: { args: true, msg: 'El Numero de la Tarjeta de Credito no debe tener letras' },
      isUnique: isUnique('formaPago', 'numero_tarjeta')
    }
  },

  codigoSeguridad: {
    type: Sequelize.STRING,
    field: 'codigo_seguridad',
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Codigo de Seguridad para la Tarjeta de Credito' }
    }
  },

  fechaVencimiento: {
    type: Sequelize.DATE,
    field: 'fecha_vencimiento',
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar la Fecha de Vencimiento para la Tarjeta de Credito' },
      isDate: { args: true, msg: 'Debe ingresar un formato de fecha valido: YYYY-MM-DD' }
    },
    get: function () {
      return moment(this.getDataValue('fechaVencimiento'), 'EEE MMM dd yyyy HH:mm:ss (zzzz)').format('YYYY-MM-DD')
    }
  },

  activo: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}

module.exports = sequelize.define(
  'forma_pago',
  FormaPagoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
