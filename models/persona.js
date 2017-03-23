'use strict'

const {Sequelize, sequelize} = require('./sequelizeConf')

const PersonaSchema = {
  cedulaRuc: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'cedula_ruc',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un numero de Cedula o RUC' },
      isNumeric: { args: true, msg: 'La cedula o RUC debe tener solo numeros' },
      len: { args: [10,13], msg: 'El numero de cedula debe tener 10 digitos o el RUC 13 digitos' },
      isUnique: isUnique('persona', 'cedula_ruc')
    }
  },
  usuario: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  apellido: {
    type: Sequelize.STRING,
    allowNull: false
  },
  direccion: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telefono: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ciudad: {
    type: Sequelize.STRING
  }
}

module.exports = sequelize.define(
  'persona',
  PersonaSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
