const express = require("express");
const app = express();
const port = 5000;

// Importa middlewares e rotas
const checaAutorizacao = require("./middlewares/authMiddleware");
const userRoutes = require("./routes/userRoutes");

const path = require("path");
// // Caminho para as páginas (views HTML)
// const caminho = path.join(__dirname, "views");

// Definindo EJS como template engine
app.set("view engine", "ejs");

// Onde ficarão os arquivos de views
app.set("views", path.join(__dirname, "views"));

// Middlewares para tratar body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());


// Middleware global de autorização (simulado)
app.use(checaAutorizacao);

// Rotas de usuários (CRUD + login)
app.use("/usuarios", userRoutes);

// Outras rotas
app.get("/home", (req, res) => {
  res.render("index", { titulo: "Home", usuario: "Visitante" });
  // res.sendFile(`${caminho}/index.html`);
});

// Página 404
app.use((req, res) => {
  res.status(404);
  res.render("404");
  // res.status(404).sendFile(`${caminho}/404.html`);
});

app.get("/", (req, res) => {
  res.send("Olá mundo, servidor rodando!");
});

// Inicia servidor
app.listen(port, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${port}`)
);
