import NaoEncontrado from "../errors/NaoEncontrado.js";

// Função middleware para lidar com requisições a recursos não encontrados (erro 404)
function manipulador404(req, res, next) {
  // Cria uma instância do erro 404 utilizando a classe 'NaoEncontrado'
  const erro404 = new NaoEncontrado();

  // Repassa o erro 404 para o próximo middleware na cadeia de middleware do Express
  next(erro404);
}

export default manipulador404;
