'use strict'

const { sequelize } = require('./models/sequelizeConf')
const app = require('./app')
const config = require('./config')

sequelize.authenticate()
.then(() => {
  console.log(`Conexion a la base de datos establecida: ${config.db}`);

  app.listen(config.port, () => {
    console.log(`API REST corriendo puerto: ${config.port}`);
  })

})
.catch(err => {
  console.log(`Error al conectarse a la base de datos: ${err}`);
})
