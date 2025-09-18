const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Cadastro
router.get("/cadastrar", userController.formCadastro);
router.post("/cadastrar", userController.salvarUsuario);

// Login
router.get("/login", userController.formLogin);
router.post("/login", userController.loginUsuario);

// CRUD
router.get("/", userController.listarUsuarios);       // Read All
router.get("/:id", userController.buscarUsuario);     // Read One
router.put("/:id", userController.atualizarUsuario);  // Update
router.delete("/:id", userController.deletarUsuario); // Delete

module.exports = router;