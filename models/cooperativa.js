'use strict'

const { Sequelize, sequelize, isUnique } = require('./sequelizeConf')

const CooperativaSchema = {
  codigo: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Codigo para la Cooperativa' },
      isUnique: isUnique('cooperativa', 'codigo'),
      len: { args: [3, 5], msg: 'El Codigo de la Cooperativa debe tener de 3 a 5 caracteres' }
    },
    set: function (valCodigo) { return this.setDataValue('codigo', valCodigo.toUpperCase()) }
  },

  ruc: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de RUC para la Cooperativa' },
      isNumeric: { args: true, msg: 'El RUC de la Cooperativa debe tener solo numeros' },
      len: { args: 13, msg: 'El RUC de la Cooperativa debe tener 13 digitos' },
      isUnique: isUnique('cooperativa', 'ruc')
    }
  },

  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Nombre para la Cooperativa' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'El Nombre de la Cooperativa debe tener solo letras' }
    },
    set: function (valNombre) { return this.setDataValue('nombre', valNombre.toUpperCase()) }
  },

  gerente: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Nombre del Gerente de la Cooperativa' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'El Nombre del Gerente de la Cooperativa debe tener solo letras' }
    },
    set: function (valGerente) { return this.setDataValue('gerente', valGerente.toUpperCase()) }
  },

  telefonoMatriz: {
    type: Sequelize.STRING,
    field: 'telefono_matriz',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Numero de Telefono para la Cooperativa' },
      isNumeric: { args: true, msg: 'El Numero de Telefono para la Cooperativa no debe tener letras' },
      len: { args: [9, 10], msg: 'El Numero de Telefono de la Cooperativa debe tener de 9 a 10 caracteres' }
    }
  },

  direccionMatriz: {
    type: Sequelize.STRING,
    field: 'direccion_matriz',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar la Direccion de la oficina matriz de la Cooperativa' }
    },
    set: function (valMatriz) { return this.setDataValue('matriz', valMatriz.toUpperCase()) }
  },

  correo: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Correo Electronico para la Cooperativa' },
      isEmail: { args: true, msg: 'El Correo Electronico ingresado no es valido' },
      len: { args: [1, 50], msg: 'El Correo Electronico no debe tener mas de 50 caracteres' },
      isUnique: isUnique('cooperativa', 'correo')
    },
    set: function (valCorreo) { return this.setDataValue('correo', valCorreo.toLowerCase()) }
  },

  claveCorreo: {
    type: Sequelize.STRING,
    field: 'clave_correo',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar la Clave del Correo Electronico' }
    }
  },

  firma: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Nombre de la Firma Electronica' }
    },
    set: function (valFirma) { return this.setDataValue('firma', valFirma.toUpperCase()) }
  },

  claveFirma: {
    type: Sequelize.STRING,
    field: 'clave_firma',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar la Clave de la Firma Electronica' }
    }
  },

  logo: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar la URL del Logo de la Cooperativa' }
    }
  },

  nombreRide: {
    type: Sequelize.STRING,
    field: 'nombre_ride',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Nombre del Ride de la Cooperativa' }
    },
    set: function (valNombreRide) { return this.setDataValue('nombreRide', valNombreRide.toUpperCase()) }
  },

  establecimiento: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Establecimiento' },
      isNumeric: { args: true, msg: 'El Numero de Establecimiento no debe tener letras' }
    }
  },

  ptoEmision: {
    type: Sequelize.INTEGER,
    field: 'pto_emision',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Punto de Emision' },
      isNumeric: { args: true, msg: 'El Punto de Emision no debe tener letras' }
    }
  },

  secuencia: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Numero de Secuencia' },
      isNumeric: { args: true, msg: 'El Numero de Secuencia no debe tener letras' }
    }
  }

}

module.exports = sequelize.define(
  'cooperativa',
  CooperativaSchema,
  {
    schema: 'oroticket',
    freezeTableName: true,
    timestamps: false
  })
