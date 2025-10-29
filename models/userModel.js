const db = require("../db/db.json");

let usuarios = db.usuarios;

module.exports = {
  // LOGIN
  login: (email, senha) => {
    return usuarios.find((u) => u.email == email && u.senha == senha) || null;
  },

  // CREATE
  salvar: ({ usuario, email, senha, tipo }) => {
    const novoUsuario = {
      id: usuarios.length + 1,
      usuario,
      email,
      senha,
      tipo,
    };
    usuarios.push(novoUsuario);
    console.log("Usuário salvo:", novoUsuario);
    return novoUsuario;
  },

  // READ
  listarTodos: () => usuarios,

  buscarPorId: (id) => usuarios.find((u) => u.id == id) || null,

  // UPDATE
  atualizar: (id, { usuario, senha, tipo }) => {
    const index = usuarios.findIndex((u) => u.id == id);
    if (index === -1) return null;

    usuarios[index] = {
      ...usuarios[index],
      usuario: usuario || usuarios[index].usuario,
      senha: senha || usuarios[index].senha,
      tipo: tipo || usuarios[index].tipo,
    };
    return usuarios[index];
  },

  // DELETE
  deletar: (id) => {
    const index = usuarios.findIndex((u) => u.id == id);
    if (index === -1) return false;
    usuarios.splice(index, 1);
    return true;
  },
};
