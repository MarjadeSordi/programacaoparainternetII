const express = require('express');
const rota = express.Router();
const clientController = require('../controller/client_controller');

//Roteamento do GET para http://localhost:3000/login
rota.post('/', clientController.validarClient)

module.exports = rota;