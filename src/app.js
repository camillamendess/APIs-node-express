import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connect = await connectDatabase();

connect.on("Error", (erro) => {
    console.error("Erro de conexão", erro );
});

connect.once("open", () => {
    console.log("Conexão com o banco feita com sucesso!");
});

const app = express();

routes(app);

export default app;

