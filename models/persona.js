'use strict'

const { Sequelize, sequelize, isUnique } = require('./sequelizeConf')

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
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un nombre de usuario' },
      isUnique: isUnique('persona', 'usuario')
    },
    set: function(valUsuario) { return this.setDataValue('usuario', valUsuario.toLowerCase()) }
  },

  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar su nombre' },
      is: { args: ['^[a-z ]+$','i'], msg: 'Su nombre debe tener solo letras' }
    },
    set: function(valNombre) { return this.setDataValue('nombre', valNombre.toUpperCase()) }
  },

  apellido: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar su apellido' },
      is: { args: ['^[a-z ]+$','i'], msg: 'Su apellido debe tener solo letras' }
    },
    set: function(valApellido) { return this.setDataValue('apellido', valApellido.toUpperCase()) }
  },

  direccion: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar su direccion' }
    },
    set: function(valDireccion) { return this.setDataValue('direccion', valDireccion.toUpperCase()) }
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar su correo electronico' },
      isEmail: { args: true, msg: 'El correo electronico ingresado no es valido' },
      isUnique: isUnique('persona', 'email')
    },
    set: function(valEmail) { return this.setDataValue('email', valEmail.toLowerCase()) }
  },

  telefono: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar un numero de telefono' },
      isNumeric: { args: true, msg: 'El numero de telefono debe tener solo numeros' }
    }
  },

  ciudad: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      notEmpty: { args: true, msg: 'Debe ingresar el nombre de su ciudad' },
      is: { args: ['^[a-z ]+$','i'], msg: 'El nombre de la ciudad debe tener solo letras' }
    },
    set: function(valCiudad) { return this.setDataValue('ciudad', valCiudad.toUpperCase()) }
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
