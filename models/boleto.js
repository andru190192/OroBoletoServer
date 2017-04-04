'use strict'

const { Sequelize, sequelize, isUnique, lenCedulaRuc } = require('./sequelizeConf')

const BoletoSchema = {
  numeroFactura: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'numero_factura',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Factura para el Boleto' },
      len: { args: 17, msg: 'El Numero de la Factura debe tener 17 caracteres, ej: 001-001-000000001' },
      isUnique: isUnique('boleto', 'numero_factura')
    }
  },

  cliente: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Cedula o RUC del Cliente' },
      isNumeric: { args: true, msg: 'El Numero de Cedula o RUC del Cliente debe tener solo numeros' },
      isLength: lenCedulaRuc(this.cliente)
    }
  },

  valor: {
    type: Sequelize.DECIMAL(9, 2),
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Precio para el Boleto' },
      min: { args: 1, msg: 'El Precio del Boleto debe ser mayor a cero' },
      isDecimal: { args: true, msg: 'El Precio del Boleto debe tener solo numeros, ej: 10.00' }
    }
  },

  formaPago: {
    type: Sequelize.INTEGER,
    field: 'forma_pago',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Codigo de la Forma de Pago para el Boleto' },
      isNumeric: { args: true, msg: 'El Codigo para la Forma de Pago del Boleto debe tener solo numeros' }
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
