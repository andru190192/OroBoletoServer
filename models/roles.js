'use strict'

const { Sequelize, sequelize } = require('./sequelizeConf')

const RolesSchema = {
  rol: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      len: { args: [1, 6], msg: 'El Nombre del Rol debe tener de 1 a 6 caracteres' }
    },
    set: function (valRol) { return this.setDataValue('rol', valRol.toUpperCase()) }
  },

  detalle: {
    type: Sequelize.STRING,
    allowNull: false,
    set: function (valDetalle) { return this.setDataValue('detalle', valDetalle.toUpperCase()) }
  }
}

module.exports = sequelize.define(
  'roles',
  RolesSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
