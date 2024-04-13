import mongoose from "mongoose";

// Configurando uma validação personalizada para o tipo String
mongoose.Schema.Types.String.set("validate", {
  // Definindo o validador, que verifica se o valor não está em branco após remover os espaços em branco do início e do fim
  validator: (valor) => valor.trim() !== "",
  // Definindo a mensagem de erro personalizada que será exibida se a validação falhar
  message: ({ path }) => `O campo ${path} foi fornecido em branco.`,
});
