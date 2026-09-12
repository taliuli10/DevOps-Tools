# Projeto 001 :: DOCKER - Aplicação Web Containerizada

* **Disciplina:** DevOps Tools
* **Professor:** Renato Sousa Botacim
* **Aluno:** Ricardo Estachiote Taliuli
* **Turma:** AN3TN
---

### 1. Qual é o objetivo da aplicação?
Meu objetivo com esse projeto foi desenvolver uma aplicação web simples de cadastro de alunos (onde consigo cadastrar o nome e o curso e listar na tela) para colocar em prática tudo o que aprendi sobre containerização com Docker e Docker Compose, garantindo que o sistema web e o banco de dados rodem perfeitamente integrados.

### 2. Quais tecnologias foram utilizadas?
Utilizei um stack bem moderno e padrão de mercado:
* **Docker e Docker Compose:** Para isolar os serviços em containers e subir tudo de uma vez só.
* **Node.js (com imagem Alpine Linux) e Express:** Para criar o servidor backend e as rotas da minha aplicação web.
* **MySQL (versão 8.0):** Como o banco de dados relacional para guardar as informações.
* **Biblioteca `mysql2` do Node.js:** Para fazer a ponte de comunicação assíncrona entre o meu servidor Node e o MySQL.
* **HTML5 e CSS básico:** Para montar a interface visual do sistema.

### 3. Como executar o projeto?
Para rodar o projeto na minha máquina, só preciso ter o Docker instalado, abrir o terminal na pasta raiz do projeto e rodar o comando: `docker compose up -d --build`. Esse comando baixa as imagens necessárias, faz o build da minha aplicação web e sobe os dois containers em segundo plano.

### 4. Qual porta deve ser acessada?
A aplicação foi configurada para mapear a porta interna do container para a porta 8080 do meu host. Para acessar o site, abro o navegador e entro em `http://localhost:8080`.

### 5. Quais containers são utilizados?
O meu `docker-compose.yml` sobe exatamente dois containers principais:
1. `app_web_container`: O container que roda o meu servidor Node.js com a aplicação web.
2. `mysql_db_container`: O container que roda o servidor do banco de dados MySQL.

### 6. Qual banco de dados é utilizado?
Utilizei o servidor de banco de dados relacional **MySQL** na versão 8.0. Também configurei o charset para `utf8mb4` para garantir que acentos e caracteres especiais não quebrem na hora de salvar e buscar os nomes dos alunos.

### 7. Qual volume foi criado?
Criei um volume nomeado chamado **`db_data`**, que fica associado diretamente ao diretório interno do MySQL (`/var/lib/mysql`). Fiz isso para garantir a persistência dos dados, ou seja, se eu derrubar ou reiniciar os containers, os dados dos alunos cadastrados não são perdidos. Também usei um volume do tipo bind mount para carregar o script `init.sql` na primeira inicialização do banco.

### 8. Qual rede foi criada?
Criei uma rede Docker personalizada do tipo bridge chamada **`app_network`**. Essa rede isola os meus containers e permite que a aplicação web converse com o banco de dados de forma segura usando apenas o nome do serviço (`db`) como endereço (hostname), sem precisar de IP fixo.

### 9. Quais variáveis de ambiente são utilizadas?
Para manter o projeto seguro e parametrizado, configurei várias variáveis de ambiente direto no `docker-compose.yml`:
* **Para a aplicação web:** `PORT=3000`, `DB_HOST=db`, `DB_USER=uvv_user`, `DB_PASSWORD=uvv_password`, `DB_NAME=escola_db` e `DB_PORT=3306`.
* **Para o banco de dados (MySQL):** `MYSQL_ROOT_PASSWORD=root_password`, `MYSQL_DATABASE=escola_db`, `MYSQL_USER=uvv_user` e `MYSQL_PASSWORD=uvv_password`.

### 10. Como parar o projeto?
Para parar a aplicação e desligar os containers de forma segura mantendo os dados salvos no volume, eu uso o comando: `docker compose down`. *(E se eu quiser parar os containers e limpar tudo, apagando inclusive os dados do volume do banco, rodo `docker compose down -v`)*.
