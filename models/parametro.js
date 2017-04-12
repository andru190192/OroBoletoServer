'use strict'

const { Sequelize, sequelize } = require('./sequelizeConf')

const ParametroSchema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },

  ruc: {
    type: Sequelize.STRING,
    allowNull: false
  },

  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },

  gerente: {
    type: Sequelize.STRING,
    allowNull: false
  },

  telefonoMatriz: {
    type: Sequelize.STRING,
    field: 'telefono_matriz',
    allowNull: false
  },

  direccionMatriz: {
    type: Sequelize.STRING,
    field: 'direccion_matriz',
    allowNull: false
  },

  correo: {
    type: Sequelize.STRING,
    allowNull: false
  },

  claveCorreo: {
    type: Sequelize.STRING,
    field: 'clave_correo',
    allowNull: false
  },

  firma: {
    type: Sequelize.STRING,
    allowNull: false
  },

  claveFirma: {
    type: Sequelize.STRING,
    field: 'clave_firma',
    allowNull: false
  },

  ambienteSri: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },

  logo: {
    type: Sequelize.STRING,
    allowNull: false
  },

  nombreRide: {
    type: Sequelize.STRING,
    field: 'nombre_ride',
    allowNull: false
  },

  establecimiento: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  ptoEmision: {
    type: Sequelize.INTEGER,
    field: 'pto_emision',
    allowNull: false
  },

  secuencia: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  ganancia: {
    type: Sequelize.DECIMAL(9, 2),
    allowNull: false
  },

  comisionFija: {
    type: Sequelize.DECIMAL(9, 2),
    field: 'comision_fija',
    allowNull: false
  },

  comisionPorcentaje: {
    type: Sequelize.DECIMAL(9, 2),
    field: 'comision_porcentaje',
    allowNull: false
  },

  iva: {
    type: Sequelize.DECIMAL(9, 2),
    allowNull: false
  }

}

module.exports = sequelize.define(
  'parametro',
  ParametroSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
