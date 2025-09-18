const db = require("../db/db.json");

let usuarios = db.usuarios;

module.exports = {
  
  // LOGIN
  login: (usuario, senha) => {
    return usuarios.find((u) => u.usuario === usuario && u.senha === senha) || null;
  },

  // CREATE
  salvar: ({ usuario,email, senha }) => {
    const novoUsuario = {
      id: usuarios.length + 1,
      usuario,
      email,
      senha,
    };
    usuarios.push(novoUsuario);
    console.log("Usuário salvo:", novoUsuario);
    return novoUsuario;
  },

  // READ
  listarTodos: () => usuarios,

  buscarPorId: (id) => usuarios.find((u) => u.id == id) || null,

  // UPDATE
  atualizar: (id, { usuario, senha }) => {
    const index = usuarios.findIndex((u) => u.id == id);
    if (index === -1) return null;

    usuarios[index] = {
      ...usuarios[index],
      usuario: usuario || usuarios[index].usuario,
      senha: senha || usuarios[index].senha,
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