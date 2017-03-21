'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const PersonaSchema = {
  cedulaRuc: { type: Sequelize.STRING, primaryKey: true, field: 'cedula_ruc', allowNull: false },
  usuario: { type: Sequelize.STRING, allowNull: false },
  nombre: { type: Sequelize.STRING, allowNull: false },
  apellido: { type: Sequelize.STRING, allowNull: false },
  direccion: Sequelize.STRING,
  email: { type: Sequelize.STRING, allowNull: false },
  telefono: { type: Sequelize.STRING, allowNull: false },
  ciudad: Sequelize.STRING
}

module.exports = sequelize.define(
  'persona',
  PersonaSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
