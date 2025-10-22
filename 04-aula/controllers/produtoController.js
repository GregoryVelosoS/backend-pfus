const path = require("path");
const produtoModel = require("../models/produtoModel");

module.exports = {
  // ---------- CRUD ----------
  formCadastro: (req, res) => {
    res.render("produtos/cadastro", { titulo: "Cadastro" });
  },

  salvarProduto: (req, res) => {
    const { nome, descricao, categoria, preco, quantidade, imagemUrl } = req.body;
    const produtoNovo = produtoModel.salvar({
      nome,
      descricao,
      categoria,
      preco,
      quantidade,
      imagemUrl,
    });
    res.render("produtos/confirmacao", {
      tipo: "cadastro",
      titulo: "Cadastro Confirmado",
      produtoNovo,
    });
  },

  listarProdutos: (req, res) => {
    const produtos = produtoModel.listarTodos();
    // res.json(produtos);
    res.render("produtos/listaProdutos", {
      titulo: "Lista de produtos",
      produtos,
    });
  },

  buscarProduto: (req, res) => {
    const id = req.params.id;
    const produto = produtoModel.buscarPorId(id);

    if (!produto) {
      return res.status(404).render("produtos/erroProduto", {
        titulo: "Erro",
        mensagem: "Produto não encontrado",
      });
    }

    res.render("produtos/editar", { titulo: "Edição", produto });
  },

  atualizarProduto: (req, res) => {
    const id = req.params.id;
    const { nome, descricao, categoria, preco, quantidade, imagemUrl } = req.body;
    console.log(req.body);

    const atualizado = produtoModel.atualizar(id, {
      nome,
      descricao,
      categoria,
      preco,
      quantidade,
      imagemUrl,
    });

    if (!atualizado) {
      return res.status(404).render("produtos/erroProduto", {
        titulo: "Erro",
        mensagem: "Produto não encontrado",
      });
    }

    res.render("produtos/confirmacao", {
      tipo: "edicao",
      titulo: "Edição Confirmada",
      atualizado,
    });
  },

  deletarProduto: (req, res) => {
    const id = req.params.id;
    const deletado = produtoModel.deletar(id);

    if (!deletado) {
      return res.status(404).render("produtos/erroProduto", {
        titulo: "Erro",
        mensagem: "Produto não encontrado",
      });
    }

    res.render("produtos/confirmacao", {
      tipo: "excluir",
      titulo: "Produto deletado",
      deletado,
    });
  },
};
