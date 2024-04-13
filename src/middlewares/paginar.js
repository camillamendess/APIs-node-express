import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

// Função middleware para paginar os resultados de uma consulta
async function paginar(req, res, next) {
  try {
    // Define os valores padrão para limite, página e ordenação, caso não sejam fornecidos na requisição
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

    // Divide o parâmetro de ordenação em campo de ordenação e ordem
    let [campoOrdenacao, ordem] = ordenacao.split(":");

    // Converte os valores de limite, página e ordem para números inteiros
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    // Obtém o resultado da consulta que foi definido anteriormente em algum middleware anterior
    const resultado = req.resultado;

    // Verifica se os valores de limite e página são válidos (maiores que zero)
    if (limite > 0 && pagina > 0) {
      // Realiza a consulta paginada utilizando os parâmetros fornecidos
      const resultadoPaginado = await resultado
        .find()
        .sort({ [campoOrdenacao]: ordem })
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();

      // Envia os resultados paginados como resposta
      res.status(200).json(resultadoPaginado);
    } else {
      // Se os valores de limite e página não forem válidos, lança um erro de 'RequisicaoIncorreta'
      next(new RequisicaoIncorreta());
    }
  } catch (erro) {
    // Em caso de erro durante o processo, repassa o erro para o próximo middleware
    next(erro);
  }
}

export default paginar;
