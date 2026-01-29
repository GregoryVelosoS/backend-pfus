const conn = require("../config/conexao"); 
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

async function migrarSenhas() {
  console.log("Iniciando migração das senhas...");

  // 1. Buscar todos os usuários
  conn.query("SELECT id, senha FROM usuarios", async (erro, usuarios) => {
    if (erro) {
      console.error("Erro ao buscar usuários:", erro);
      process.exit(1);
    }

    for (const usuario of usuarios) {
      const senhaAtual = usuario.senha;

      // Verificar se a senha já está hasheada
      const pareceHash = senhaAtual.startsWith("$2");

      if (pareceHash) {
        console.log(`Usuário ID ${usuario.id}: já possui hash. Pulando.`);
        continue;
      }

      try {
        const hash = await bcrypt.hash(senhaAtual, SALT_ROUNDS);

        await new Promise((resolve, reject) => {
          conn.query(
            "UPDATE usuarios SET senha = ? WHERE id = ?",
            [hash, usuario.id],
            (erro) => {
              if (erro) reject(erro);
              else resolve();
            }
          );
        });

        console.log(`Usuário ID ${usuario.id}: senha migrada.`);
      } catch (erroHash) {
        console.error(`Erro ao gerar hash para ID ${usuario.id}:`, erroHash);
      }
    }

    console.log("Migração concluída.");
    process.exit(0);
  });
}

migrarSenhas();
