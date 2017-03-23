'use strict'

const auth = require('../middlewares/auth')
const express = require('express')
const api = express.Router()

const cooperativaCtrl = require('../controllers/cooperativa')

api.get('/cooperativa', auth, cooperativaCtrl.getCooperativas)
api.get('/cooperativa/:cooperativaId',  auth, cooperativaCtrl.getCooperativa)
api.post('/cooperativa', auth, cooperativaCtrl.saveCooperativa)
api.put('/cooperativa/:cooperativaId', auth, cooperativaCtrl.updateCooperativa)
api.delete('/cooperativa/:cooperativaId', auth, cooperativaCtrl.deleteCooperativa)


const authCtrl = require('../controllers/auth')

api.post('/signUp', authCtrl.signUp)
api.post('/signIn', authCtrl.signIn)


module.exports = api
