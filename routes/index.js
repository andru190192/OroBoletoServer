'use strict'

const auth = require('../middlewares/auth')
const express = require('express')
const api = express.Router()


const authCtrl = require('../controllers/auth')
api.post('/signUp', authCtrl.signUp)
api.post('/signIn', authCtrl.signIn)


const cooperativaCtrl = require('../controllers/cooperativa')
api.get('/cooperativas', auth, cooperativaCtrl.getCooperativas)
api.get('/cooperativa/:cooperativaId',  auth, cooperativaCtrl.getCooperativa)
api.post('/cooperativa', auth, cooperativaCtrl.saveCooperativa)
api.put('/cooperativa/:cooperativaId', auth, cooperativaCtrl.updateCooperativa)
api.delete('/cooperativa/:cooperativaId', auth, cooperativaCtrl.deleteCooperativa)


const personaCtrl = require('../controllers/persona')
api.get('/personas', auth, personaCtrl.getPersonas)
api.get('/persona/:personaId', auth, personaCtrl.getPersona)
api.post('/persona', auth, personaCtrl.savePersona)
api.put('/persona/:personaId', auth, personaCtrl.updatePersona)
api.delete('/persona/:personaId', auth, personaCtrl.deletePersona)


const rutaCtrl = require('../controllers/ruta')
api.get('/rutas/:cooperativaId', auth, rutaCtrl.getRutas)
api.get('/ruta/:cooperativaId/:origenId/:destinoId', auth, rutaCtrl.getRuta)
api.get('/rutasAppMobile/ciudadOrigen', auth, rutaCtrl.getCiudadOrigen)
api.get('/rutasAppMobile/ciudadDestino/:origenId', auth, rutaCtrl.getCiudadDestino)
api.post('/ruta', auth, rutaCtrl.saveRuta)
api.put('/ruta/:cooperativaId/:origenId/:destinoId', auth, rutaCtrl.updateRuta)
api.delete('/ruta/:cooperativaId/:origenId/:destinoId', auth, rutaCtrl.deleteRuta)


const turnoCtrl = require('../controllers/turno')
api.get('/turnos/:cooperativaId/:origenId/:destinoId', auth, turnoCtrl.getTurnos)
api.get('/turno/:codigoId', auth, turnoCtrl.getTurno)
api.get('/turnosAppMobile/:origenId/:destinoId/:fecha', auth, turnoCtrl.getTurnosPorFecha)
api.post('/turno', auth, turnoCtrl.saveTurno)


module.exports = api
