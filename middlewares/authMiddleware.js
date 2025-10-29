const checaAutorizacao = (req, res, next) => {
  req.authStatus = false; // simulação

  if (req.authStatus) {
    console.log("Usuário Autenticado");
  } else {
    console.log("Usuário não possui permissão para acessar");
  }

  next();
};

module.exports = checaAutorizacao;