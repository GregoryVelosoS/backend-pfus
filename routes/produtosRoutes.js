const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoController");


// CRUD
// C
router.get("/cadastrar", produtoController.formCadastro);
router.post("/cadastrar", produtoController.salvarProduto);

// R
router.get("/", produtoController.listarProdutos);       
router.get("/:id", produtoController.buscarProduto);   

// U
router.post("/:id", produtoController.atualizarProduto);  

// D
router.get("/deletar/:id", produtoController.deletarProduto); 

module.exports = router;