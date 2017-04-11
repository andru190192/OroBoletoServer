'use strict'

const { Sequelize, sequelize } = require('./sequelizeConf')

const DetalleBoletoSchema = {
  numeroFactura: {
    type: Sequelize.STRING,
    field: 'numero_factura',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Factura para el Boleto' },
      len: { args: 17, msg: 'El Numero de la Factura debe tener 17 caracteres, ej: 001-001-000000001' }
    }
  },

  cliente: {
    type: Sequelize.STRING,
    allowNull: false
  },

  turno: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  numeroAsiento: {
    type: Sequelize.INTEGER,
    field: 'numero_asiento',
    allowNull: false
  },

  valor: {
    type: Sequelize.DECIMAL(9, 2),
    allowNull: false
  }
}

module.exports = sequelize.define(
  'detalle_boleto',
  DetalleBoletoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
