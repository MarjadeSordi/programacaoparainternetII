const serviceRepository = require('../repository/service_repository');
const jwt = require('jsonwebtoken');

exports.listarService = (req, res) => {    
  serviceRepository.listar((err, listaService) => {
      if(err) { 
          res.status(500).json({ msg: err.msg }) 
      }
      else {
          res.json(listaService);
      }
  })
}

exports.inserir =  (req, res) => {
    let service= req.body;
    if (service.tipe && service.price && service.retouch) {
     serviceRepository.inserir(service, (err, serviceOk) => {
        if(err) {
          res.status(500).json({msg: err.msg})
        }
        else{
          res.status(201).send(serviceOk);
        }
      });
    }
    else {
      //Bad request 
      res.status(400).json({msg:"Entrada de dados inválida"});
    }
  };

  exports.buscarPorTipe = (req, res) => {
    const query = req.query;
    if(query && query.tipe){
       serviceRepository.buscarPorService(query.tipe, (err, tipeEncontrado) => {
            if(err) { 
                res.status(500).json({ msg: err}) 
            }
            else if(tipeEncontrado) {
                res.json(tipeEncontrado);
            }
            else {
                res.status(404).json({msg:"Tipo não encontrado"});
            }    
        });
    }
    else {
        //Bad Request
  
      res.status(400).json({msg:"Faltou a query tipe"});
    }
  }
  