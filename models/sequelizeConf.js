'use strict'

const config = require('../config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.db ,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    //logging: true,
    timestamps: false
  });

module.exports = {
  Sequelize,
  sequelize
}
