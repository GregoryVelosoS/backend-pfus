// Importa a conexão com o banco de dados
const conn = require("../config/conexao");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12; // escolha adequada

module.exports = {
  // LOGIN
  login: (email, senha, callback) => {
   const sql = `SELECT * FROM usuarios WHERE email = ?`;

  conn.query(sql, [email], async (erro, resultados) => {
    if (erro) {
      return callback(erro, null);
    }

    const usuarioEncontrado = resultados[0];

    if (!usuarioEncontrado) {
      return callback(null, null); // e-mail inexistente
    }

    try {
      const senhaCorreta = await bcrypt.compare(
        senha,
        usuarioEncontrado.senha
      );

      if (!senhaCorreta) {
        return callback(null, null); // senha inválida
      }

      // Credenciais corretas:
      callback(null, usuarioEncontrado);

    } catch (erro) {
      callback(erro, null);
    }
  });
  },

  // CREATE
  salvar: async ({ usuario, email, senha, tipo }, callback) => {
    const senhaComHash = await bcrypt.hash(senha, SALT_ROUNDS);
    const sql = `
      INSERT INTO usuarios (usuario, email, senha, tipo)
      VALUES (?, ?, ?, ?)
    `;

    const valores = [usuario, email, senhaComHash, tipo]

    conn.query(sql, valores, (erro, resultado) => {
      if (erro) 
        return callback(erro, null);
      
      const novoUsuario = { id: resultado.insertId, usuario, email, tipo };
      
      callback(null, novoUsuario);
    });
  },

  // READ - listar todos
  listarTodos: (callback) => {
    const sql = "SELECT * FROM usuarios";

    conn.query(sql, (erro, resultados) => {
      if (erro) 
        return callback(erro, null);
      
      callback(null, resultados);
    });
  },

  // READ - buscar por ID
  buscarPorId: (id, callback) => {
    const sql = `
    SELECT * FROM usuarios 
    WHERE id = ?`;
    
  const valores = [id]

    conn.query(sql, valores, (erro, resultados) => {
      if (erro) 
        return callback(erro, null);
      
      callback(null, resultados[0] || null);
    });
  },

  // UPDATE
    atualizar: async (id, { usuario, senha, tipo }, callback) => {
      try {
      const senhaComHash = senha 
        ? await bcrypt.hash(senha, SALT_ROUNDS)
        : null;

      const sql = `
        UPDATE usuarios
        SET usuario = ?, senha = ?, tipo = ?
        WHERE id = ?
      `;

      const valores = [usuario, senhaComHash, tipo, id];

      conn.query(sql, valores, (erro, resultado) => {
        if (erro) {
          return callback(erro, null);
        }

        //aqui
        // Criar objeto usuarioAtualizado
        const atualizado = {
          usuario: valores[0],
        };
        // aqui
        callback(null, atualizado);
      });
    } catch (erro) {
      callback(erro, null);
    }
    },

    // DELETE
    deletar: (id, callback) => {
      const sql = "DELETE FROM usuarios WHERE id = ?";
      
      const valores = [id]

      conn.query(sql, valores, (erro, resultado) => {
        if (erro) 
          return callback(erro, null);
        
        const deletado = resultado[0];
        callback(null, deletado);
      });
    },
};
