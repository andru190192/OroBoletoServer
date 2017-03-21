'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const BitacoraSchema = {
  id: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  detalle: { type: Sequelize.STRING, allowNull: false }
}

module.exports = sequelize.define(
  'bitacora',
  BitacoraSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
