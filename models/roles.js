'use strict'

const { Sequelize, sequelize } = require('./sequelizeConf')

const RolesSchema = {
  rol: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  detalle: { type: Sequelize.STRING , allowNull: false }
}

module.exports = sequelize.define(
  'roles',
  RolesSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
