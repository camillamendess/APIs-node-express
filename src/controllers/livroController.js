import { autores, livros } from "../models/index.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

// Define a classe do controlador para operações relacionadas a livros
class LivroController {
  // Método estático para listar todos os livros
  static listarLivros = async (req, res, next) => {
    try {
      // Encontra todos os livros no banco de dados
      const buscaLivros = livros.find();

      // Define o resultado na requisição para uso posterior
      req.resultado = buscaLivros;

      // Chama o próximo middleware
      next();
    } catch (erro) {
      // Em caso de erro, chama o próximo middleware com o erro
      next(erro);
    }
  };

  // Método estático para listar um livro por ID
  static listarLivroPorId = async (req, res, next) => {
    try {
      // Obtém o ID do livro da requisição
      const id = req.params.id;

      // Encontra o livro pelo ID no banco de dados e popula o campo 'autor'
      const livroResultado = await livros
        .findById(id, {}, { autopopulate: false })
        .populate("autor");

      // Verifica se o livro foi encontrado
      if (livroResultado !== null) {
        // Se encontrado, envia o livro encontrado como resposta
        res.status(200).send(livroResultado);
      } else {
        // Se não encontrado, chama o próximo middleware com um erro de 'NaoEncontrado'
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      // Em caso de erro, chama o próximo middleware com o erro
      next(erro);
    }
  };

  // Método estático para cadastrar um livro
  static cadastrarLivro = async (req, res, next) => {
    try {
      // Cria um novo livro com os dados da requisição
      let livro = new livros(req.body);

      // Salva o livro no banco de dados
      const livroResultado = await livro.save();

      // Envia o livro cadastrado como resposta
      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      // Em caso de erro, chama o próximo middleware com o erro
      next(erro);
    }
  };

  // Método estático para atualizar um livro
  static atualizarLivro = async (req, res, next) => {
    try {
      // Obtém o ID do livro da requisição
      const id = req.params.id;

      // Atualiza o livro pelo ID com os dados da requisição
      const livroResultado = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });

      // Verifica se o livro foi encontrado e atualizado
      if (livroResultado !== null) {
        // Se encontrado e atualizado, envia uma mensagem de sucesso como resposta
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        // Se não encontrado, chama o próximo middleware com um erro de 'NaoEncontrado'
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      // Em caso de erro, chama o próximo middleware com o erro
      next(erro);
    }
  };

  // Método estático para excluir um livro
  static excluirLivro = async (req, res, next) => {
    try {
      // Obtém o ID do livro da requisição
      const id = req.params.id;

      // Exclui o livro pelo ID
      const livroResultado = await livros.findByIdAndDelete(id);

      // Verifica se o livro foi encontrado e excluído
      if (livroResultado !== null) {
        // Se encontrado e excluído, envia uma mensagem de sucesso como resposta
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        // Se não encontrado, chama o próximo middleware com um erro de 'NaoEncontrado'
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      // Em caso de erro, chama o próximo middleware com o erro
      next(erro);
    }
  };

  // Método estático para listar livros com base em filtros
  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      // Processa os parâmetros de busca da requisição
      const busca = await processaBusca(req.query);

      // Verifica se a busca retornou algum resultado
      if (busca !== null) {
        // Se houver resultados, busca os livros no banco de dados de acordo com os filtros
        const livrosResultado = await livros.find(busca);

        // Define o resultado na requisição para uso posterior
        req.resultado = livrosResultado;

        // Chama o próximo middleware
        next();
      } else {
        // Se não houver resultados, envia uma resposta vazia
        res.status(200).send([]);
      }
    } catch (erro) {
      // Em caso de erro, chama o próximo middleware com o erro
      next(erro);
    }
  };
}

// Função assíncrona para processar os parâmetros de busca da requisição
async function processaBusca(parametros) {
  // Extrai os parâmetros da busca
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  // Objeto para armazenar os critérios de busca
  let busca = {};

  // Adiciona os critérios de busca conforme os parâmetros fornecidos
  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  // Adiciona os critérios de busca para o número de páginas
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  // Adiciona o critério de busca para o nome do autor
  if (nomeAutor) {
    // Consulta o autor na coleção de autores pelo nome, para obter o ID do autor
    const autor = await autores.findOne({ nome: nomeAutor });

    // Se o autor for encontrado, adiciona o ID do autor como critério de busca
    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      // Se o autor não for encontrado, define a busca como nula
      busca = null;
    }
  }

  // Retorna os critérios de busca processados
  return busca;
}

export default LivroController;
