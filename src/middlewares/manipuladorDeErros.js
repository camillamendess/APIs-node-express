import mongoose from "mongoose";

import ErroBase from "../errors/ErroBase.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import ErroValidacao from "../errors/ErroValidacao.js";

// Função middleware para manipular diferentes tipos de erros

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  // Verifica se o erro é do tipo CastError do mongoose (ocorre quando a conversão de tipos falha)
  if (erro instanceof mongoose.Error.CastError) {
    // Se for um erro de CastError, envia uma resposta de requisição incorreta
    new RequisicaoIncorreta().enviarResposta(res);
  }
  // Verifica se o erro é do tipo ValidationError do mongoose (ocorre quando a validação de esquema falha)
  else if (erro instanceof mongoose.Error.ValidationError) {
    // Se for um erro de ValidationError, envia uma resposta de erro de validação
    new ErroValidacao(erro).enviarResposta(res);
  }
  // Verifica se o erro é uma instância de ErroBase (um erro personalizado)
  else if (erro instanceof ErroBase) {
    // Se for um erro personalizado, envia a resposta correspondente ao erro
    erro.enviarResposta(res);
  }
  // Se não for nenhum dos tipos de erro especificados acima
  else {
    // Envia uma resposta de erro base genérico
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
