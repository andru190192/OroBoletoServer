'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const FormaPagoSchema = {
  id: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  cliente: { type: Sequelize.STRING, allowNull: false },
  tipo: { type: Sequelize.STRING, allowNull: false },
  nombreTarjeta: { type: Sequelize.STRING, field: 'nombre_tarjeta' },
  numeroTarjeta: { type: Sequelize.STRING, field: 'numero_tarjeta' },
  codigoSeguridad: { type: Sequelize.STRING, field: 'codigo_seguridad' },
  fechaVencimiento: { type: Sequelize.STRING, field: 'fecha_vencimiento' },
  activo: { type: Sequelize.STRING, allowNull: false }
}

module.exports = sequelize.define(
  'forma_pago',
  FormaPagoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
