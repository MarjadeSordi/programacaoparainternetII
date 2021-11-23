const express = require('express');
const rota = express.Router();
const scheduleController = require('../controller/schedule_controller');

//Roteamento do GET para http://localhost:3000/agenda
rota.get('/', scheduleController.listarSchedule);
//Roteamento do POST para http://localhost:3000/agenda/
rota.post('/', scheduleController.inserirDados);
//Roteamento do PUT para http://localhost:3000/agenda/editar
rota.put('/editar/:id', scheduleController.editarDados);
//Roteamento do GET para http://localhost:3000/agenda/buscar
rota.get('/buscar', scheduleController.buscarPorService)
//Roteamento do GET para http://localhost:3000/agenda/buscar
rota.get('/nomesocial', scheduleController.buscarPorNomeSocial)

module.exports = rota;