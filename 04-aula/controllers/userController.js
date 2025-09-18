const path = require("path");
const userModel = require("../models/userModel");

const caminho = path.join(__dirname, "..", "views");

module.exports = {
  // ---------- VIEWS ----------
  formCadastro: (req, res) => {
    // res.sendFile(`${caminho}/cadastro.html`);
    res.render("cadastro");
  },

  formLogin: (req, res) => {
    // res.sendFile(`${caminho}/login.html`);
    res.render("login");
  },

  // ---------- LOGIN ----------
  loginUsuario: (req, res) => {
    const { usuario, senha } = req.body;
    const logado = userModel.login(usuario, senha);

    if (!logado) {
      return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
      // return res.render("login", { mensagem: "Usuário ou senha inválidos" });
    }
    res.json({ mensagem: "Login realizado com sucesso", usuario: logado });
    // res.render("index", { titulo: "Bem-vindo ao sistema", usuario: logado.usuario });
  },

  // ---------- CRUD ----------
  salvarUsuario: (req, res) => {
    const { usuario,email, senha } = req.body;
    userModel.salvar({ usuario,email, senha });
    // res.sendFile(`${caminho}/cadastroConfirmado.html`);
    res.render("cadastroConfirmado");
  },

  listarUsuarios: (req, res) => {
    const usuarios = userModel.listarTodos();
    res.json(usuarios);
    res.render("usuarios", { usuarios });
  },

  buscarUsuario: (req, res) => {
    const id = req.params.id;
    const usuario = userModel.buscarPorId(id);

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json(usuario);
  },

  atualizarUsuario: (req, res) => {
    const id = req.params.id;
    const { usuario, senha } = req.body;
    const atualizado = userModel.atualizar(id, { usuario, senha });

    if (!atualizado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json({ mensagem: "Usuário atualizado com sucesso", atualizado });
  },

  deletarUsuario: (req, res) => {
    const id = req.params.id;
    const deletado = userModel.deletar(id);

    if (!deletado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json({ mensagem: "Usuário deletado com sucesso" });
  },
};
