// import http from "http";

import app from "./src/app.js"

const PORT = 3000;

/* 
Maneira tradicional com módulo http (sem express) de criar o servidor e as rotas

const rotas = {
	"/": "<h1>Curso de Node.js</h1>",
	"/livros": "<h1>Entrei na rota livros</h1>",
	"/autores": "<h1>Entrei na rota autores</h1>"
};

const server = http.createServer((req, res) => {
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.end(rotas[req.url]);
}); */

app.listen(PORT, () => {
	console.log("Servidor escutando!");
});