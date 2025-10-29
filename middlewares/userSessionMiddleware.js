
// Middleware para tornar a sessão acessível nas views EJS
export function usuarioMiddleware(req, res, next) {
  // Torna a sessão (ou dados do usuário) acessível em todas as views EJS
  res.locals.logado = req.session?.logado || null;
  next();
}