const express = require("express");
const path = require("path");

const app = express();
const port = 5000;

// Caminho para as páginas (views HTML)
const caminho = path.join(__dirname, "views");

// Middlewares para tratar body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Importa middlewares e rotas
const checaAutorizacao = require("./middlewares/authMiddleware");
const userRoutes = require("./routes/userRoutes");

// Middleware global de autorização (simulado)
app.use(checaAutorizacao);

// Rotas de usuários (CRUD + login)
app.use("/usuarios", userRoutes);

// Outras rotas
app.get("/home", (req, res) => {
  res.sendFile(`${caminho}/index.html`);
});

app.get("/", (req, res) => {
  res.send("Olá mundo, servidor rodando!");
});

// Página 404
app.use((req, res) => {
  res.status(404).sendFile(`${caminho}/404.html`);
});

// Inicia servidor
app.listen(port, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${port}`)
);