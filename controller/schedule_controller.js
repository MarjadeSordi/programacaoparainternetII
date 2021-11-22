const scheduleRepository = require('../repository/schedule_repository');
const serviceRepository = require('../repository/service_repository');


exports.listarSchedule = (req, res) => {
  scheduleRepository.listar((err, listaSchedule) => {
    if (err) {
      res.status(500).json({
        msg: err.msg
      })
    } else {
      res.json(listaSchedule);
    }
  })
}



exports.inserirDados = (req, res, rows) => {
  const schedule = req.body;
  if (schedule && schedule.nomesocial && schedule.servico && schedule.data && schedule.horario) {
    serviceRepository.buscarPorService(schedule.servico, (err, servico) => {
      if (err) {
        res.status(401).json({
          msg: "Serviço não existe"
        })
      } else if (schedule.servico && servico.tipe == 'coloracao') {
        let date = new Date(schedule.data);
        let dia = date.getDate();
        let dataMonth = date.getMonth();
        let ano4 = date.getFullYear();
        let findRetouch = (dataMonth + 1) + servico.retouch;
        const str_data = ano4 + '-' + (findRetouch) + '-' + dia;
        const price = servico.price;

        const NewData = {
          nomesocial: schedule.nomesocial,
          servico: schedule.servico,
          data: schedule.data,
          horario: schedule.horario,
          retouch: str_data,
          price: price,
        }

        if (NewData) {
          scheduleRepository.inserir(NewData, (err, scheduleOk) => {
            if (err) {
              res.status(500).json({
                msg: err.msg
              })
            } else {
              res.status(201).send(scheduleOk);
            }
          });
        } else {
          //Bad request 
          res.status(400).json({
            msg: "Entrada de dados inválida"
          });
        }
      };


    })
  }
}

exports.editarDados = (req, res) => {
  const id = req.params.id; 
  const schedule = req.body;
  const newHorario = {
    id: id,
    horario: schedule.horario
  }
  if (newHorario) {     
          scheduleRepository.editarAgenda(newHorario, (err, scheduleOk) => {
            if (err) {
              res.status(500).json({
                msg: err.msg
              })
            } else {
              res.status(201).send(scheduleOk);
            }
          });
        } else {
          //Bad request 
          res.status(400).json({
            msg: "Entrada de dados inválida"
          });
        }
      };



exports.buscarPorTipe = (req, res) => {
  const query = req.query;
  if (query && query.tipe) {
    serviceRepository.buscarPorService(query.tipe, (err, tipeEncontrado) => {
      if (err) {
        res.status(500).json({
          msg: err
        })
      } else if (tipeEncontrado) {
        res.json(tipeEncontrado);
      } else {
        res.status(404).json({
          msg: "Tipo não encontrado"
        });
      }
    });
  } else {
    //Bad Request

    res.status(400).json({
      msg: "Faltou a query tipe"
    });
  }
}