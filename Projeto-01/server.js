const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'uvv_user',
    password: process.env.DB_PASSWORD || 'uvv_password',
    database: process.env.DB_NAME || 'escola_db',
    port: process.env.DB_PORT || 3306,
    charset: 'utf8mb4'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados MySQL:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL com sucesso!');
});

app.get('/', (req, res) => {
    const query = 'SELECT * FROM alunos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar alunos:', err);
            return res.status(500).send('Erro no servidor ao carregar dados.');
        }

        let linhasTabela = '';
        results.forEach((aluno) => {
            linhasTabela += `
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">${aluno.id}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${aluno.nome}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${aluno.curso}</td>
                </tr>
            `;
        });

        res.send(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Sistema de Cadastro de Alunos</title>
            </head>
            <body style="font-family: Arial, sans-serif; margin: 40px; background-color: #f4f6f9; color: #333;">
                <div style="max-width: 800px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <h2 style="color: #0056b3; margin-top: 0;">Sistema de Cadastro de Alunos (Dockerized)</h2>
                    
                    <fieldset style="border: 1px solid #ccc; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
                        <legend style="font-weight: bold; color: #444;">Cadastrar Novo Aluno</legend>
                        <form action="/alunos" method="POST" style="display: flex; flex-direction: column; gap: 15px;">
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Nome Completo:</label>
                                <input type="text" name="nome" required style="width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Nome do Curso:</label>
                                <input type="text" name="curso" required style="width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
                            </div>
                            <button type="submit" style="background-color: #28a745; color: white; border: none; padding: 10px; border-radius: 4px; font-size: 16px; cursor: pointer; font-weight: bold;">Salvar Aluno</button>
                        </form>
                    </fieldset>

                    <h3 style="color: #333;">Alunos Cadastrados</h3>
                    <table style="width: 100%; border-collapse: collapse; text-align: left;">
                        <thead>
                            <tr style="background-color: #0056b3; color: white;">
                                <th style="padding: 10px; border: 1px solid #004085;">ID</th>
                                <th style="padding: 10px; border: 1px solid #004085;">Nome</th>
                                <th style="padding: 10px; border: 1px solid #004085;">Curso</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${linhasTabela || '<tr><td colspan="3" style="padding: 15px; text-align: center; color: #777;">Nenhum aluno cadastrado ate o momento.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </body>
            </html>
        `);
    });
});

app.post('/alunos', (req, res) => {
    const { nome, curso } = req.body;
    const query = 'INSERT INTO alunos (nome, curso) VALUES (?, ?)';
    
    db.query(query, [nome, curso], (err, result) => {
        if (err) {
            console.error('Erro ao inserir aluno:', err);
            return res.status(500).send('Erro ao cadastrar aluno no banco de dados.');
        }
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
