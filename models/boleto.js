'use strict'

const { Sequelize, sequelize, isUnique } = require('./sequelizeConf')

const BoletoSchema = {
  numeroFactura: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'numero_factura',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Numero de Factura' },
      isUnique: isUnique('boleto', 'numero_factura')
    }
  },

  cliente: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Cedula o RUC del Cliente' },
      isNumeric: { args: true, msg: 'El Numero de Cedula o RUC del Cliente debe tener solo numeros' },
      len: { args: [10,13], msg: 'El Numero de Cedula debe tener 10 digitos o el RUC 13 digitos' }
    }
  },

  valor: {
    type: Sequelize.DECIMAL(9, 2),
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Precio para el Boleto' },
      is: { args: ['^[0-9.]+$','i'], msg: 'El Precio del Boleto debe tener solo numeros, ej: 10.00' }
    }
  },

  formaPago: {
    type: Sequelize.INTEGER,
    field: 'forma_pago',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Codigo de la Forma de Pago para el Boleto' }
    }
  }
}

module.exports = sequelize.define(
  'boleto',
  BoletoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
