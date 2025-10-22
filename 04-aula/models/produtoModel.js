const db = require("../db/db.json");

let produtos = db.produtos;

module.exports = {

  // CREATE
  salvar: ({ nome, descricao, categoria, preco, quantidade, imagemUrl}) => {
    const novoProduto = {
      id: produtos.length + 1,
      nome,
      descricao,
      categoria,
      preco,
      quantidade,
      imagemUrl,
    };
    produtos.push(novoProduto);
    console.log("Produto salvo:", novoProduto);
    return novoProduto;
  },

  // READ
  listarTodos: () => produtos,

  buscarPorId: (id) => produtos.find((u) => u.id == id) || null,

  // UPDATE
  atualizar: (id, { nome, descricao, categoria, preco, quantidade, imagemUrl }) => {
    const index = produtos.findIndex((u) => u.id == id);
    if (index === -1) return null;

    produtos[index] = {
      ...produtos[index],
      nome: nome || produtos[index].nome,
      descricao: descricao || produtos[index].descricao,
      categoria: categoria || produtos[index].categoria,
      preco: preco || produtos[index].preco,
      quantidade: quantidade || produtos[index].quantidade,
      imagemUrl: imagemUrl || produtos[index].imagemUrl,
    };
    return produtos[index];
  },

  // DELETE
  deletar: (id) => {
    const index = produtos.findIndex((u) => u.id == id);
    if (index === -1) return false;
    produtos.splice(index, 1);
    return true;
  },
};
