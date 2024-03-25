import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
dotenv.config();

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());
app.get("/livros", (req, res, next) => {
  console.log("Middleware registrado no GET da rota /livros");
  next();
});
routes(app);

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;
