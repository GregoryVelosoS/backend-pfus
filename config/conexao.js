const mysql = require("mysql2");

//Criar variavel pra conexao com o banco
const conn = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "usbw",
  database: "supermercado",
});

// Código pra só iniciar a aplicação se conectar ao banco primeiro
conn.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Conectado com sucesso");
  }
});

module.exports = conn;
