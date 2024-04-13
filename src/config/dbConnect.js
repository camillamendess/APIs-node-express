// Importando o pacote mongoose
import mongoose from "mongoose";

// Conectando-se ao banco de dados usando a string de conexão fornecida por uma variável de ambiente
mongoose.connect(process.env.STRING_CONEXAO_DB);

// Obtendo a conexão do banco de dados
let db = mongoose.connection;

// Exportando a conexão para que possa ser utilizada em outros módulos
export default db;
