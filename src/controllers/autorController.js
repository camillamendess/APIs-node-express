import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores } from "../models/index.js";

// Define a classe do controlador para operações relacionadas a autores
class AutorController {
  // Método estático para listar todos os autores
  static listarAutores = async (req, res, next) => {
    try {
      // Encontra todos os autores no banco de dados
      const autoresResultado = autores.find();

      // Define o resultado na requisição para uso posterior
      req.resultado = autoresResultado;

      // Chama o próximo middleware
      next();
    } catch (erro) {
      // Em caso de erro, envia uma resposta de erro interno do servidor
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  // Método estático para listar um autor por ID
  static listarAutorPorId = async (req, res, next) => {
    try {
      // Obtém o ID do autor da requisição
      const id = req.params.id;

      // Encontra o autor pelo ID no banco de dados
      const autorResultado = await autores.findById(id);

      // Verifica se o autor foi encontrado
      if (autorResultado !== null) {
        // Se encontrado, envia o autor encontrado como resposta
        res.status(200).send(autorResultado);
      } else {
        // Se não encontrado, chama o próximo middleware com um erro de 'NaoEncontrado'
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      // Em caso de erro, chama o próximo middleware com o erro
      next(erro);
    }
  };

  // Método estático para cadastrar um autor
  static cadastrarAutor = async (req, res, next) => {
    try {
      // Cria um novo autor com os dados da requisição
      let autor = new autores(req.body);

      // Salva o autor no banco de dados
      const autorResultado = await autor.save();

      // Envia o autor cadastrado como resposta
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      // Em caso de erro, chama o próximo middleware com o erro
      next(erro);
    }
  };

  // Método estático para atualizar um autor
  static atualizarAutor = async (req, res, next) => {
    try {
      // Obtém o ID do autor da requisição
      const id = req.params.id;

      // Atualiza o autor pelo ID com os dados da requisição
      const autorResultado = await autores.findByIdAndUpdate(id, {
        $set: req.body,
      });

      // Verifica se o autor foi encontrado e atualizado
      if (autorResultado !== null) {
        // Se encontrado e atualizado, envia uma mensagem de sucesso como resposta
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        // Se não encontrado, chama o próximo middleware com um erro de 'NaoEncontrado'
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      // Em caso de erro, chama o próximo middleware com o erro
      next(erro);
    }
  };

  // Método estático para excluir um autor
  static excluirAutor = async (req, res, next) => {
    try {
      // Obtém o ID do autor da requisição
      const id = req.params.id;

      // Exclui o autor pelo ID
      const autorResultado = await autores.findByIdAndDelete(id);

      // Verifica se o autor foi encontrado e excluído
      if (autorResultado !== null) {
        // Se encontrado e excluído, envia uma mensagem de sucesso como resposta
        res.status(200).send({ message: "Autor removido com sucesso" });
      } else {
        // Se não encontrado, chama o próximo middleware com um erro de 'NaoEncontrado'
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      // Em caso de erro, chama o próximo middleware com o erro
      next(erro);
    }
  };
}
export default AutorController;
