'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const BoletoSchema = {
  numeroFactura: { type: Sequelize.STRING, primaryKey: true, field: 'numero_factura', allowNull: false },
  cliente: { type: Sequelize.STRING, allowNull: false },
  valor: { type: Sequelize.STRING, allowNull: false },
  formaPago: { type: Sequelize.INTEGER, field: 'forma_pago', allowNull: false }
}

module.exports = sequelize.define(
  'boleto',
  BoletoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
