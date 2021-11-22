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
  con.query('SELECT * FROM schedule', (err, res) => {
    callback(err, res);

  })
};

exports.inserir = (schedule, callback) => {
  const sql = "INSERT INTO schedule (nomesocial, servico, data, horario, retouch, price) VALUES (?,?,?,?,?,?)";
  const values = [schedule.nomesocial, schedule.servico, schedule.data, schedule.horario, schedule.retouch, schedule.price];
  con.query(sql, values, (err, res) => {
    callback(err, res);
    console.log(err);
  })
}


exports.buscarPorNome = (nomesocial, callback) => {
  const sql = "SELECT * FROM schedule WHERE nomesocial=?;";
  const values = [nomesocial]
  con.query(sql, values, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      const error = "Agendamento não encontrado";
      callback(error, null);
    }

  });

}

exports.editarAgenda = (newhorario, callback) => {
  const sql = "UPDATE schedule set horario =? where id=?";
  console.log('aqui', newhorario)
  const values = [newhorario.horario, newhorario.id]
  con.query(sql, values, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      const error = "Agendamento não encontrado";
      callback(error, null);
    }

  });

}