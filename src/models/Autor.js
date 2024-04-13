import mongoose from "mongoose";

// Definindo um esquema para os autores
const autorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: {
      type: String,
      required: [true, "O nome do(a) autor(a) é obrigatório"],
    },
    nacionalidade: { type: String }, // Campo para a nacionalidade do autor
  },
  {
    versionKey: false, // Desabilita a inclusão do "__v" (versão) no documento
  }
);

// Criando um modelo (model) com o nome "autores" baseado no esquema definido
const autores = mongoose.model("autores", autorSchema);

export default autores;
