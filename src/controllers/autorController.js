import { autor } from "../models/Autor";

class AutorController {

  static async listarAutores(req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha na requisição`});
    }
  }

  static async listarAutorPorId (req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      res.status(200).json(autorEncontrado);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha na requisição do autor`});
    }
  }

  static async adicionarAutor (req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao cadastrar autor`});
    }
  }

  static async atualizarAutor (req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, res.body);
      res.status(200).json({ message: "Autor atualizado" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha na atualização`});
    }
  }

  static async deleteAutor (req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor deletado" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha na remoção`});
    }
  }
}

export default AutorController;
