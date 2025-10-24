const express = require("express");
const app = express();
const session = require("express-session");
const port = 5000;

// Importa middlewares e rotas
const checaAutorizacao = require("./middlewares/authMiddleware");
const {usuarioMiddleware} = require("./middlewares/userSessionMiddleware");
const userRoutes = require("./routes/userRoutes");
const produtosRoutes = require("./routes/produtosRoutes");

const path = require("path");
// // Caminho para as páginas (views HTML)
// const caminho = path.join(__dirname, "views");

app.use(express.static('public'));

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

// Middleware de sessão
app.use(session({
  secret: "chave-super-segura", // use algo mais forte em produção
  resave: false,
  saveUninitialized: false,
}));

app.use(usuarioMiddleware)

// Rotas de usuários (CRUD + login)
app.use("/usuarios", userRoutes);

// Rotas de produtos (CRUD)
app.use("/produtos", produtosRoutes);

// Outras rotas
app.get("/home", (req, res) => {
  // res.sendFile(`${caminho}/index.html`);
  res.status(200);
  res.render("index", { titulo: "Home", usuario: "Visitante" });
});

app.get("/", (req, res) => {
  // res.send("Olá mundo, servidor rodando!")
  res.status(200);
  res.render("index", { titulo: "Inicio" });
});

// Página 404
app.use((req, res) => {
  res.status(404);
  res.render("404", { titulo: "Página Erro" });
  // res.status(404).sendFile(`${caminho}/404.html`);
});

// Inicia servidor
app.listen(port, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${port}`)
);
