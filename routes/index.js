'use strict'

const auth = require('../middlewares/auth')
const express = require('express')
const api = express.Router()


const authCtrl = require('../controllers/auth')
api.post('/signUp', authCtrl.signUp)
api.post('/signIn', authCtrl.signIn)


const cooperativaCtrl = require('../controllers/cooperativa')
api.get('/cooperativa', auth, cooperativaCtrl.getCooperativas)
api.get('/cooperativa/:cooperativaId',  auth, cooperativaCtrl.getCooperativa)
api.post('/cooperativa', auth, cooperativaCtrl.saveCooperativa)
api.put('/cooperativa/:cooperativaId', auth, cooperativaCtrl.updateCooperativa)
api.delete('/cooperativa/:cooperativaId', auth, cooperativaCtrl.deleteCooperativa)


const personaCtrl = require('../controllers/persona')
api.get('/persona', auth, personaCtrl.getPersonas)
api.get('/persona/:personaId', auth, personaCtrl.getPersona)
api.post('/persona', auth, personaCtrl.savePersona)
api.put('/persona/:personaId', auth, personaCtrl.updatePersona)
api.delete('/persona/:personaId', auth, personaCtrl.deletePersona)


const rutaCtrl = require('../controllers/ruta')
api.get('/ruta/:cooperativaId', auth, rutaCtrl.getRutas)
api.get('/ruta/:cooperativaId/:origenId/:destinoId', auth, rutaCtrl.getRuta)
api.get('/rutas/ciudadOrigen', auth, rutaCtrl.getCiudadOrigen)
api.get('/rutas/ciudadDestino/:origenId', auth, rutaCtrl.getCiudadDestino)
api.post('/ruta', auth, rutaCtrl.saveRuta)


module.exports = api
