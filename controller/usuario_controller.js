const usuarioRepository = require('../repository/usuario_repository');
const jwt = require('jsonwebtoken');

exports.listaUsuarios = (req, res) => {    
  usuarioRepository.listar((err, listaUsuarios) => {
      if(err) { 
          res.status(500).json({ msg: err.msg }) 
      }
      else {
          res.json(listaUsuarios);
      }
  })
}


exports.buscarPorUsername = (req, res) => {
  const query = req.query;
  if(query && query.username){
     usuarioRepository.buscarPorUser(query.username, (err, usuarioEncontrado) => {
          if(err) { 
              res.status(500).json({ msg: err}) 
          }
          else if(usuarioEncontrado) {
              res.json(usuarioEncontrado);
          }
          else {
              res.status(404).json({msg:"Usuario nao encontrado"});
          }    
      });
  }
  else {
      //Bad Request

    res.status(400).json({msg:"Faltou a query username"});
  }
}


exports.inserir =  (req, res) => {
  let usuario = req.body;
  if (usuario.nome && usuario.email && usuario.username && usuario.senha){
    usuarioRepository.inserir(usuario, (err, usuarioInserido) => {
      if(err) {
        res.status(500).json({msg: err.msg})
      }
      else{
        res.status(201).send(usuarioInserido);
      }
    });
  }
  else {
    //Bad request 
    res.status(400).json({msg:"Entrada de dados inválida"});
  }
}; 


exports.validarUsuario = (req, res) => {
  const userLogin = req.body;
  if(userLogin && userLogin.username && userLogin.senha){
    usuarioRepository.buscarPorUsername(userLogin.username, (err, usuario) => {
      if(err) { 
        res.status(401).json({ msg: "Usuário Inválido" }) 
    }
    else if(usuario) {
        if (usuario.senha == userLogin.senha){           
          res.status(201).json({"validado": true})
        }
        else {
          res.status(401).json({ msg: "Senha inválida"})
        }
    }
    else {
        res.status(404).json({msg:"Usuario inválido"});
    } 
    })
  }
  else {
    res.status(401).json({msg: "Usuário ou senha inválidos"})
  }
}

exports.validarToken = (req, res, next) => {
  const token = req.log('Authorization');
  if(token){
      next();
  }
  else {
      res.status(403).json({erro: "Não tem token de acesso"});
  }
}



