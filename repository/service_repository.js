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
    con.query('SELECT * FROM service', (err, res) => {
        callback(err, res);

    })
};

exports.inserir = (service, callback) => {
    const sql = "INSERT INTO service (tipe, price, retouch) VALUES (?,?,?);";
    const values = [service.tipe, service.price, service.retouch];
    con.query(sql, values, (err, res) => {
        callback(err, res);
        console.log(err);
    })
}


exports.buscarPorService = (tipe, callback) => {
    const sql = "SELECT * FROM service WHERE tipe=?;";
    const values = [tipe]
    con.query(sql, values, (err, rows) => {
        if (err) {
            callback(err, null);
        } else if (rows) {
            callback(null, rows[0]);
        } else {
            const error = "Tipo de serviço não encontrado";
            callback(error, null);
        }

    });

}