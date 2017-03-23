'use strict'

const {Sequelize, sequelize, isUnique} = require('./sequelizeConf')

const BoletoSchema = {
  numeroFactura: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'numero_factura',
    allowNull: false,
    validate: {
      isUnique: isUnique('boleto', 'numero_factura')
    }
  },
  cliente: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un numero de cedula o RUC para el cliente' },
      isNumeric: { args: true, msg: 'El numero de cedula o RUC del cliente debe tener solo numeros' },
      len: { args: [10,13], msg: 'El numero de cedula debe tener 10 digitos o el RUC 13 digitos' }
    }
  },
  valor: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: { args: true, msg: 'Debe ingresar un precio para el boleto' }
    }
  },
  formaPago: {
    type: Sequelize.INTEGER,
    field: 'forma_pago',
    allowNull: false
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
