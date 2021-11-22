const express = require('express');
const rota = express.Router();
const clientController = require("../controller/client_controller")
//const usuarioController = require('../controller/usuario_controller');

//Roteamento do GET para http://localhost:3000/clients
rota.get('/', clientController.listarClientes);
//Roteamento do POST para http://localhost:3000/clients
rota.post('/', clientController.inserir)
//Roteamento do GET para http://localhost:3000/clients/buscar
rota.get('/buscar', clientController.buscarPorNomeSocial)

module.exports = rota;