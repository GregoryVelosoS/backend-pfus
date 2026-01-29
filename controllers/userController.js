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

    userModel.login(email, senha, (erro, logado) => {
      if (erro) {
        console.error(erro);
        return res.status(500).render("login", {
          titulo: "Login",
          erro: "Erro no servidor ao realizar login.",
        });
      }

      if (!logado) {
        return res.render("login", {
          titulo: "Login",
          erro: "Email ou senha inválidos",
        });
      }

      // Salva os dados do usuário na sessão
      req.session.logado = {
        id: logado.id,
        usuario: logado.usuario,
        email: logado.email,
        tipo: logado.tipo,
      };
     
      res.redirect("/home");
    });
  },

  // ---------- CRUD ----------
  formCadastro: (req, res) => {
    res.render("usuarios/cadastro", { titulo: "Cadastro" });
  },

  salvarUsuario: (req, res) => {
    const { usuario, email, senha, tipo } = req.body;

    userModel.salvar({ usuario, email, senha, tipo }, (erro, usuarioNovo) => {
      if (erro) {
        console.error(erro);
        return res.status(500).render("usuarios/erroUsuario", {
          titulo: "Erro",
          mensagem: "Erro ao salvar usuário.",
        });
      }

      res.render("usuarios/confirmacao", {
        tipo: "cadastro",
        titulo: "Cadastro Confirmado",
        usuarioNovo,
      });
    });
  },

  listarUsuarios: (req, res) => {
    userModel.listarTodos((erro, usuarios) => {
      if (erro) {
        console.error(erro);
        return res.status(500).render("usuarios/erroUsuario", {
          titulo: "Erro",
          mensagem: "Erro ao listar usuários.",
        });
      }

      res.render("usuarios/listaUsuarios", {
        titulo: "Lista de Usuários",
        usuarios,
      });
    });
  },

  buscarUsuario: (req, res) => {
    const id = req.params.id;

    userModel.buscarPorId(id, (erro, usuario) => {
      if (erro) {
        console.error(erro);
        return res.status(500).render("usuarios/erroUsuario", {
          titulo: "Erro",
          mensagem: "Erro ao buscar usuário.",
        });
      }

      if (!usuario) {
        return res.status(404).render("usuarios/erroUsuario", {
          titulo: "Erro",
          mensagem: "Usuário não encontrado.",
        });
      }

      res.render("usuarios/editar", { titulo: "Edição", usuario });
    });
  },

  atualizarUsuario: (req, res) => {
    const id = req.params.id;
    const { usuario, senha, tipo } = req.body;

    //aqui
    userModel.atualizar(id, { usuario, senha, tipo }, (erro, atualizado) => {
      if (erro) {
        console.error(erro);
        return res.status(500).render("usuarios/erroUsuario", {
          titulo: "Erro",
          mensagem: "Erro ao atualizar usuário.",
        });
      }

      if (!atualizado) {
        return res.status(404).render("usuarios/erroUsuario", {
          titulo: "Erro",
          mensagem: "Usuário não encontrado.",
        });
      }

      res.render("usuarios/confirmacao", {
        tipo: "edicao",
        titulo: "Edição Confirmada",
        //aqui
        atualizado

      });
    });
  },

  deletarUsuario: (req, res) => {
    const id = req.params.id;

    userModel.deletar(id, (erro, sucesso) => {
      if (erro) {
        console.error(erro);
        return res.status(500).render("usuarios/erroUsuario", {
          titulo: "Erro",
          mensagem: "Erro ao deletar usuário.",
        });
      }
      const deletado = { usuario: "selecionado"}

      res.render("usuarios/confirmacao", {
        tipo: "excluir",
        titulo: "Usuário Deletado",
        deletado
      });
    });
  },
};
