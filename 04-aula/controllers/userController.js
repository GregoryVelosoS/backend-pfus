const path = require("path");
const userModel = require("../models/userModel");

const caminho = path.join(__dirname, "..", "views");

module.exports = {
  // ---------- VIEWS ----------
  formCadastro: (req, res) => {
    res.sendFile(`${caminho}/cadastro.html`);
  },

  formLogin: (req, res) => {
    res.sendFile(`${caminho}/login.html`);
  },

  // ---------- CRUD ----------
  salvarUsuario: (req, res) => {
    const { usuario, senha } = req.body;
    userModel.salvar({ usuario, senha });
    res.sendFile(`${caminho}/cadastroConfirmado.html`);
  },

  listarUsuarios: (req, res) => {
    const usuarios = userModel.listarTodos();
    res.json(usuarios);
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

  // ---------- LOGIN ----------
  loginUsuario: (req, res) => {
    const { usuario, senha } = req.body;
    const logado = userModel.login(usuario, senha);

    if (!logado) {
      return res.status(401).json({ mensagem: "Usuário ou senha inválidos" });
    }

    res.json({ mensagem: "Login realizado com sucesso", usuario: logado });
  },
};