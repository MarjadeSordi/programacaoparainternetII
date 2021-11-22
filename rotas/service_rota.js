const express = require('express');
const rota = express.Router();
const serviceController = require('../controller/service_controller');

//Roteamento do GET para http://localhost:3000/usuario
rota.get('/', serviceController.listarService);
//Roteamento do POST para http://localhost:3000/usuario
rota.post('/', serviceController.inserir)
//Roteamento do GET para http://localhost:3000/usuario/buscar
rota.get('/buscar', serviceController.buscarPorTipe)

module.exports = rota;