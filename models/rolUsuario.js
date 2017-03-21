'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const RolUsuarioSchema = {
  rol: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  usuario: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
  activo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
}

module.exports = sequelize.define(
  'rol_usuario',
  RolUsuarioSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
