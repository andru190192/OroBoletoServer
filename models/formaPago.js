'use strict'

const { Sequelize, sequelize, lenCedulaRuc } = require('./sequelizeConf')
const moment = require('moment')

const FormaPagoSchema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Codigo para la Forma de Pago' },
      isNumeric: { args: true, msg: 'El Codigo para la Forma de Pago debe tener solo numeros' }
    }
  },

  cliente: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Cedula o RUC para el Cliente' },
      isNumeric: { args: true, msg: 'La Cedula o RUC del Cliente debe tener solo numeros' },
      isLength: lenCedulaRuc(this.cliente)
    }
  },

  tipo: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Tipo para la Forma de Pago' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'El Tipo para la Forma de Pago debe tener solo letras' }
    },
    set: function (valTipo) { return this.setDataValue('tipo', 'TC') }
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
      len: { args: [15, 16], msg: 'El Numero de la Tarjeta de Credito debe tener 16 digitos' }
      // isUnique: isUnique('formaPago', 'numero_tarjeta')
    }
  },

  codigoSeguridad: {
    type: Sequelize.STRING,
    field: 'codigo_seguridad',
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Codigo de Seguridad de la Tarjeta de Credito' },
      isNumeric: { args: true, msg: 'El Codigo de Seguridad de la Tarjeta de Credito no debe tener letras' },
      len: { args: [3, 4], msg: 'El Codigo de Seguridad de la Tarjeta de Credito debe tener 3 digitos' }
    }
  },

  fechaVencimiento: {
    type: Sequelize.DATE,
    field: 'fecha_vencimiento',
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar la Fecha de Vencimiento de la Tarjeta de Credito' },
      isDate: { args: true, msg: 'Debe ingresar un formato valido para la Fecha de Vencimiento de la Tarjeta de Credito: YYYY-MM-DD' },
      isAfter: { args: moment().format('YYYY-MM-DD'), msg: 'La Fecha de Vencimiento de la Tarjeta de Credito debe ser posterior a la Fecha Actual' }
      // La fecha de Vencimiento debe ser superior a la fecha actual.
      // Si se presentan problemas por tarjetas vencidas, aumentar n dias a la fecha actual.
    },
    get: function () {
      return moment(this.getDataValue('fechaVencimiento')).format('YYYY-MM-DD')
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
