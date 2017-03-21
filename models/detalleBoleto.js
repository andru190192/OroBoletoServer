'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const DetalleBoletoSchema = {
  numeroFactura: { type: Sequelize.STRING, field: 'numero_factura', allowNull: false },
  cliente: { type: Sequelize.STRING, allowNull: false },
  turno: { type: Sequelize.STRING, allowNull: false },
  placa: { type: Sequelize.STRING, allowNull: false },
  numeroAsiento: { type: Sequelize.STRING, field: 'numero_asiento', allowNull: false },
  valor: { type: Sequelize.STRING, allowNull: false }
}

module.exports = sequelize.define(
  'detalle_boleto',
  DetalleBoletoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
