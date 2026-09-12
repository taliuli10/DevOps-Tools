const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Aplicacao HTTP em Node.js - Versao 2.0 (Atualizada!)\n');
});

server.listen(port, () => {
  console.log(`Servidor v2.0 rodando na porta ${port}`);
});
