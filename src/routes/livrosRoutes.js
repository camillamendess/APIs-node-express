import express from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros);

routes.get("/livros/:id", LivroController.listarLivroPorId);

routes.post("/livros", LivroController.adicionarLivro);

routes.put("/livros/:id", LivroController.atualizarLivro);

routes.delete("/livros/:id", LivroController.deleteLivro);

export default routes;