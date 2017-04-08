'use strict'

const { Sequelize, sequelize, isUnique, lenCedulaRuc } = require('./sequelizeConf')

const PersonaSchema = {
  cedulaRuc: {
    type: Sequelize.STRING,
    primaryKey: true,
    field: 'cedula_ruc',
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Numero de Cedula o RUC' },
      isNumeric: { args: true, msg: 'El Numero de Cedula o RUC no debe tener letras' },
      isLength: lenCedulaRuc(this.cedulaRuc)
    }
  },

  usuario: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Nombre de Usuario' },
      isUnique: isUnique('persona', 'usuario')
    },
    set: function (valUsuario) { return this.setDataValue('usuario', valUsuario.toLowerCase()) }
  },

  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar su Nombre' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'Su Nombre debe tener solo letras' }
    },
    set: function (valNombre) { return this.setDataValue('nombre', valNombre.toUpperCase()) }
  },

  apellido: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar su Apellido' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'Su Apellido debe tener solo letras' }
    },
    set: function (valApellido) { return this.setDataValue('apellido', valApellido.toUpperCase()) }
  },

  direccion: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar su Direccion' }
    },
    set: function (valDireccion) { return this.setDataValue('direccion', valDireccion.toUpperCase()) }
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar su Correo Electronico' },
      isEmail: { args: true, msg: 'El Correo Electronico ingresado no es valido' }
    },
    set: function (valEmail) { return this.setDataValue('email', valEmail.toLowerCase()) }
  },

  telefono: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un Numero de Telefono' },
      isNumeric: { args: true, msg: 'El Numero de Telefono no debe tener letras' },
      len: { args: [9, 10], msg: 'El Numero de Telefono debe tener de 9 a 10 caracteres' }
    }
  },

  ciudad: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el Nombre de su Ciudad' },
      is: { args: ['^[a-z ]+$', 'i'], msg: 'El Nombre de la Ciudad debe tener solo letras' }
    },
    set: function (valCiudad) { return this.setDataValue('ciudad', valCiudad.toUpperCase()) }
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
