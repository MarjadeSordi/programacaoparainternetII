const mysql = require('mysql');
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.localhost, // O host do banco. Ex: localhost
    user: process.env.user, // Um usuário do banco. Ex: user 
    password: process.env.password, // A senha do usuário. Ex: user123
    database: process.env.database,
    multipleStatements: true
});


exports.listar = (callback) => {
    con.query('SELECT * FROM client', (err, res) => {
        callback(err, res);

    })
    con.destroy();
};


exports.inserir = (client, callback) => {
    const sql = "INSERT INTO client(nome, nomesocial, genero, idade, telefone, email, senha) VALUES (?,?,?,?,?,?,?);";
    const values = [client.nome, client.nomesocial, client.genero, client.idade, client.telefone, client.email, client.senha];
    con.query(sql, values, (err, res) => {
        callback(err, res);
        console.log(err);
    })
    con.destroy();
}


exports.buscarPorNomeSocial = (nomesocial, callback) => {
    const sql = "SELECT * FROM client WHERE nomesocial=?;";
    const values = [nomesocial]
    con.query(sql, values, (err, rows) => {
        if (err) {
            callback(err, null);
        } else if (rows) {
            callback(null, rows[0]);
        } else {
            const error = "Nome não encontrado";
            callback(error, null);
        }

    });
    con.destroy();
}