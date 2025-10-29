const path = require("path");
const userModel = require("../models/userModel");

module.exports = {
  // ---------- VIEWS ----------
  formLogin: (req, res) => {
    req.session.destroy();
    res.render("login", { titulo: "Login" });
  },

  // ---------- LOGIN ----------
  loginUsuario: (req, res) => {
    const { email, senha } = req.body;
    const logado = userModel.login(email, senha);

    if (!logado) {
      return res.render("login", {
        titulo: "Login",
        erro: "Email ou senha inválidos",
      });
    }

    // Salva os dados do usuário na sessão
    req.session.logado = {
      id: logado.id,
      usuario: logado.usuario, // conforme o retorno do seu model
      email: logado.email,
    };
    res.redirect("/home");
  },

  // ---------- CRUD ----------
  formCadastro: (req, res) => {
    res.render("usuarios/cadastro", { titulo: "Cadastro" });
  },

  salvarUsuario: (req, res) => {
    const { usuario, email, senha, tipo } = req.body;
    const usuarioNovo = userModel.salvar({ usuario, email, senha, tipo });
    res.render("usuarios/confirmacao", {
      tipo: "cadastro",
      titulo: "Cadastro Confirmado",
      usuarioNovo,
    });
  },

  listarUsuarios: (req, res) => {
    const usuarios = userModel.listarTodos();
    // res.json(usuarios);
    res.render("usuarios/listaUsuarios", {
      titulo: "Lista de usuarios",
      usuarios,
    });
  },

  buscarUsuario: (req, res) => {
    const id = req.params.id;
    const usuario = userModel.buscarPorId(id);

    if (!usuario) {
      return res.status(404).render("usuarios/erroUsuario", {
        titulo: "Erro",
        mensagem: "Usuário não encontrado",
      });
    }

    res.render("usuarios/editar", { titulo: "Edição", usuario });
  },

  atualizarUsuario: (req, res) => {
    const id = req.params.id;
    const { usuario, email, senha, tipo } = req.body;
    const atualizado = userModel.atualizar(id, { usuario, email, senha, tipo });

    if (!atualizado) {
      return res.status(404).render("usuarios/erroUsuario", {
        titulo: "Erro",
        mensagem: "Usuário não encontrado",
      });
    }

    res.render("usuarios/confirmacao", {
      tipo: "edicao",
      titulo: "Edição Confirmada",
      atualizado,
    });
  },

  deletarUsuario: (req, res) => {
    const id = req.params.id;
    const deletado = userModel.deletar(id);

    if (!deletado) {
      return res.status(404).render("usuarios/erroUsuario", {
        titulo: "Erro",
        mensagem: "Usuário não encontrado",
      });
    }

    res.render("usuarios/confirmacao", {
      tipo: "excluir",
      titulo: "Usuário deletado",
      deletado,
    });
  },
};
