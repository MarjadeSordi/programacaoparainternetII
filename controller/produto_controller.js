const produtoRepository = require('../repository/produto_repository')

exports.listarProdutos = (req, res) => {   
  produtoRepository.listar((err, listaProdutos) => {
    if(err) {
      res.status(500).json({msg: err.msg})
    }
    else {
      res.json(listaProdutos)
    }
  }) 

};

exports.buscarID = (req, res) => {
  const id = req.params.id;
  produtoRepository

  const produtoEncontrado = listaProdutos.find( 
      (prod) => prod.id == id
  );
  if(produtoEncontrado) {
      res.json(produtoEncontrado);
  }
  else {
      res.status(404).json({msg:"Produto nao encontrado"});
  }
};

exports.inserir =  (req, res) => {
  let produto = req.body;
  produto.id = idGerador++;
  listaProdutos.push(produto);
  res.status(201).send(produto);
}; 

exports.atualizarProduto = (req, res) => {
  const id = req.params.id;
  const produtoAtualizar = req.body;

  const produtoEncontrado = listaProdutos.find( 
      (prod) => prod.id == id
  );
  if(produtoEncontrado) {
      produtoEncontrado.nome = produtoAtualizar.nome;
      produtoEncontrado.preco = produtoAtualizar.preco;
      res.json(produtoEncontrado);
  }
  else {
      res.status(404).json({msg:"Produto nao encontrado"});
  }

};

exports.deletar = (req, res) => {
  const id = req.params.id;

  const indiceEncontrado = listaProdutos.findIndex( 
      (prod) => prod.id == id
  );

  if(indiceEncontrado > -1) {
      const produto = listaProdutos[indiceEncontrado];
      listaProdutos.splice(indiceEncontrado,1);
      res.json(produto);
  }
  else {
      res.status(404).json({msg:"Produto nao encontrado"});
  }
}
