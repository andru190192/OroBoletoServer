'use strict'

const express = require('express')
const api = express.Router()

const cooperativaCtrl = require('../controllers/cooperativa')

api.get('/cooperativa', cooperativaCtrl.getCooperativas)
api.get('/cooperativa/:cooperativaId',  cooperativaCtrl.getCooperativa)
api.post('/cooperativa', cooperativaCtrl.saveCooperativa)
api.put('/cooperativa/:cooperativaId', cooperativaCtrl.updateCooperativa)
api.delete('/cooperativa/:cooperativaId', cooperativaCtrl.deleteCooperativa)


module.exports = api
