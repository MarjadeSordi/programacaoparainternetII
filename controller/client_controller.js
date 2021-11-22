const clientRepository = require('../repository/client_repository');
const jwt = require('jsonwebtoken');

exports.listarClientes = (req, res) => {
  clientRepository.listar((err, listaClientes) => {
    if (err) {
      res.status(500).json({
        msg: err.msg
      })
    } else {
      res.json(listaClientes);
    }
  })
}


exports.inserir = (req, res) => {
  let client = req.body;
  if (client.nome && client.nomesocial && client.genero && client.idade &&
    client.telefone && client.email && client.senha) {
    clientRepository.inserir(client, (err, clientOk) => {
      if (err) {
        res.status(500).json({
          msg: err.msg
        })
      } else {
        res.status(201).send(clientOk);
      }
    });
  } else {
    //Bad request 
    res.status(400).json({
      msg: "Entrada de dados inválida"
    });
  }
};

exports.buscarPorNomeSocial = (req, res) => {
  const query = req.query;
  if (query && query.nomesocial) {
    clientRepository.buscarPorNomeSocial(query.nomesocial, (err, nomesocialEncontrado) => {
      if (err) {
        res.status(500).json({
          msg: err
        })
      } else if (nomesocialEncontrado) {
        res.json(nomesocialEncontrado);
      } else {
        res.status(404).json({
          msg: "Usuario nao encontrado"
        });
      }
    });
  } else {
    //Bad Request
    res.status(400).json({
      msg: "Faltou a query nome social"
    });
  }
}



//------------------------------LOGIN ------------------------------------\\

exports.validarClient = (req, res) => {
  const clientLogin = req.body;
  if (clientLogin && clientLogin.nomesocial && clientLogin.senha) {
    clientRepository.buscarPorNomeSocial(clientLogin.nomesocial, (err, cliente) => {
      if (err) {
        res.status(401).json({
          msg: "Usuário Inválido"
        })
      }
      const newcliente = cliente;



      if (clientLogin.senha == newcliente.senha) {
        const token = jwt.sign({
          id: newcliente.id,
          nomesocial: newcliente.nomesocial,
        }, "B@rberPoc", {
          expiresIn: '2h'
        });
        res.status(201).json({
          'token': token
        })
      } else {
        res.status(401).json({
          msg: "Senha inválida"
        })
      }


    })
  }
}
//------------------------------TOKEN ------------------------------------\\


exports.validarToken = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, "B@rberPoc", (err, payload) => {
      if (err) {
        res.status(403).json({
          erro: "Nao tem token de acesso"
        });
      } else {
        console.log("ID do usuario: " + payload.id);
        next();
      }
    })

  } else {
    res.status(403).json({
      erro: "Nao tem token de acesso"
    });
  }
}