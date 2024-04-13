import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

// Definindo um esquema para os livros
const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: {
    type: String,
    required: [true, "O título do livro é obrigatório"],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O(a) autor(a) é obrigatório"],
    autopopulate: { select: "nome" },
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatória"],
    enum: {
      // Restrição de valores permitidos para a editora
      values: ["Clássicos", "Romance"], // Valores permitidos para a editora
      message: "A editora {VALUE} não é um valor permitido.", // Mensagem de erro personalizada
    },
  },
  numeroPaginas: {
    type: Number,
    min: [
      10,
      "O número de páginas deve ser entre 10 e 5000. Valor fornecido: {VALUE}",
    ], // Restrição do número mínimo de páginas
    max: [
      5000,
      "O número de páginas deve ser entre 10 e 5000. Valor fornecido: {VALUE}",
    ], // Restrição do número máximo de páginas
  },
});

livroSchema.plugin(autopopulate); // Popular informações+

// Criando um modelo (model) com o nome "livros" baseado no esquema definido
const livros = mongoose.model("livros", livroSchema);

export default livros;
