'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const VehiculoSchema = {
  placa: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  tipo: Sequelize.STRING,
  numeroAsientos: { type: Sequelize.STRING, field: 'numero_asientos', allowNull: false },
  numeroDisco: { type: Sequelize.STRING, field: 'numero_disco', allowNull: false },
  chofer: { type: Sequelize.STRING, allowNull: false }
}

module.exports = sequelize.define(
  'vehiculo',
  VehiculoSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
