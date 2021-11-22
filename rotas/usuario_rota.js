const express = require('express');
const rota = express.Router();
const usuarioController = require('../controller/usuario_controller');

//Roteamento do GET para http://localhost:3000/usuario
rota.get('/', usuarioController.listaUsuarios);
//Roteamento do POST para http://localhost:3000/usuario
rota.post('/', usuarioController.inserir)
//Roteamento do GET para http://localhost:3000/usuario/buscar
rota.get('/buscar', usuarioController.buscarPorUsername)

module.exports = rota;