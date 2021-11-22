const express = require('express');
const clientController = require('./controller/client_controller');
const app = express();
const porta = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
    extended: true
})) // for parsing application/x-www-form-urlencoded



const loginRota = require('./rotas/login_rota');
app.use('/login', loginRota);


const clientRota = require('./rotas/client_rota');
app.use('/clients', clientRota);

const scheduleRota = require('./rotas/schedule_rota');
app.use('/agenda', clientController.validarToken, scheduleRota);

const serviceRota = require('./rotas/service_rota');
app.use('/service', serviceRota);


app.listen(porta, () =>
    console.log(`Iniciando o servidor na porta ${porta}`)
);