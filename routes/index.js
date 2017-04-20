'use strict'

const auth = require('../middlewares/auth')
const express = require('express')
const api = express.Router()

const personaCtrl = require('../controllers/persona')
api.post('/signUp', personaCtrl.signUp)
api.post('/signIn', personaCtrl.signIn)

api.get('/personas', auth, personaCtrl.getPersonas)
api.get('/persona/:personaId', auth, personaCtrl.getPersona)
api.post('/persona', auth, personaCtrl.savePersona)
api.put('/persona/:personaId', auth, personaCtrl.updatePersona)
api.delete('/persona/:personaId', auth, personaCtrl.deletePersona)

const cooperativaCtrl = require('../controllers/cooperativa')
api.get('/cooperativas', auth, cooperativaCtrl.getCooperativas)
api.get('/cooperativa/:cooperativaId', auth, cooperativaCtrl.getCooperativa)
api.post('/cooperativa', auth, cooperativaCtrl.saveCooperativa)
api.put('/cooperativa/:cooperativaId', auth, cooperativaCtrl.updateCooperativa)
api.delete('/cooperativa/:cooperativaId', auth, cooperativaCtrl.deleteCooperativa)

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
api.put('/turno/:turnoId', auth, turnoCtrl.updateTurno)
api.delete('/turno/:turnoId', auth, turnoCtrl.deleteTurno)

const formaPagoCtrl = require('../controllers/formaPago')
api.get('/formasPagosAppMobile/:clienteId', auth, formaPagoCtrl.getFormasPagos)
api.get('/formaPagoAppMobile/:formaPagoId', auth, formaPagoCtrl.getFormaPago)
api.post('/formaPagoAppMobile', auth, formaPagoCtrl.saveFormaPago)
api.put('/formaPagoAppMobile/:formaPagoId', auth, formaPagoCtrl.updateFormaPago)

const boletoCtrl = require('../controllers/boleto')
api.get('/boletos/:clienteId', auth, boletoCtrl.getBoletos)
api.get('/boleto/:boletoId', auth, boletoCtrl.getBoleto)
api.post('/boleto', auth, boletoCtrl.saveBoleto)
api.put('/boleto/:boletoId', auth, boletoCtrl.updateBoleto)
api.delete('/boleto/:boletoId', auth, boletoCtrl.deleteBoleto)

const vehiculoCtrl = require('../controllers/vehiculo')
api.get('/vehiculos/:choferId', auth, vehiculoCtrl.getVehiculos)
api.get('/vehiculo/:vehiculoId', auth, vehiculoCtrl.getVehiculo)
api.post('/vehiculo', auth, vehiculoCtrl.saveVehiculo)
api.put('/vehiculo/:vehiculoId', auth, vehiculoCtrl.updateVehiculo)
api.delete('/vehiculo/:vehiculoId', auth, vehiculoCtrl.deleteVehiculo)

const turnoVehiculoCtrl = require('../controllers/turnoVehiculo')
api.get('/turnosVehiculos/:turnoId', auth, turnoVehiculoCtrl.getTurnosVehiculos)
api.get('/turnoVehiculo/:turnoVehiculoId', auth, turnoVehiculoCtrl.getTurnoVehiculo)
api.get('/turnoVehiculoAppMobile/:turnoId/:fecha', auth, turnoVehiculoCtrl.getTurnosVehiculoPorFecha)
api.post('/turnoVehiculo', auth, turnoVehiculoCtrl.saveTurnoVehiculo)
api.put('/turnoVehiculo/:turnoVehiculoId', auth, turnoVehiculoCtrl.updateTurnoVehiculo)
api.delete('/turnoVehiculo/:turnoVehiculoId', auth, turnoVehiculoCtrl.deleteTurnoVehiculo)

module.exports = api
