'use strict'

const { Sequelize, sequelize } = require('./sequelizeConf')

const BitacoraSchema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  detalle: {
    type: Sequelize.STRING,
    allowNull: false
  }
}

module.exports = sequelize.define(
  'bitacora',
  BitacoraSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
