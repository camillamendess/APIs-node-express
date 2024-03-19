import express from "express";
import AutorController from "../controllers/autorController.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores);
routes.get("/autores/:id", AutorController.listarAutorPorId);
routes.post("/autores", AutorController.adicionarAutor);
routes.put("/autores/:id", AutorController.atualizarAutor);
routes.delete("/autores/:id", AutorController.deleteAutor);

export default routes;