# Tibox Ideias — Back-end

Este é o back-end do projeto Tibox Ideias, uma API REST desenvolvida em Node.js com Express e Prisma ORM, conectada a um banco de dados PostgreSQL. O sistema gerencia usuários, ideias, votos e comentários, garantindo regras de negócio e integridade dos dados para o front-end.

---

## 🚀 O que a API faz?

- **Cadastro de Usuários:** Gerencia os usuários que podem criar ideias, votar e comentar.
- **Cadastro de Ideias:** Permite que usuários registrem novas ideias, vinculando-as ao autor.
- **Listagem de Ideias:** Retorna todas as ideias cadastradas, incluindo votos, comentários e autor.
- **Detalhes de Ideia:** Retorna todos os dados de uma ideia específica, incluindo comentários e quem já votou.
- **Votação em Ideias:** Permite que um usuário vote em uma ideia apenas uma vez, registrando o nome do usuário no array `votedBy`.
- **Comentários:** Permite que usuários comentem em ideias, vinculando cada comentário ao usuário e à ideia.
- **Regras de Negócio:** 
  - Um usuário só pode votar uma vez por ideia.
  - Comentários e votos são validados e vinculados corretamente.
  - Retorno de mensagens de erro claras para tentativas inválidas (ex: voto duplicado).

---

## 🛠️ Principais Bibliotecas e Ferramentas

- **Express:** Framework para criação de APIs REST.
- **Prisma ORM:** Mapeamento objeto-relacional para PostgreSQL, facilitando queries e migrações.
- **PostgreSQL:** Banco de dados relacional robusto e confiável.
- **dotenv:** Gerenciamento de variáveis de ambiente.
- **CORS:** Permite integração segura com o front-end.
- **Nodemon:** Hot reload em desenvolvimento.

---

## 📁 Estrutura dos Modelos (Prisma)

- **User**
  - `id`: Identificador único.
  - `name`: Nome do usuário.
  - Relacionamento com ideias criadas e comentários.

- **Idea**
  - `id`: Identificador único.
  - `title`: Título da ideia.
  - `description`: Descrição da ideia.
  - `createdById`: Usuário criador.
  - `votes`: Número de votos.
  - `votedBy`: Array de nomes dos usuários que já votaram.
  - Relacionamento com comentários.

- **Comment**
  - `id`: Identificador único.
  - `message`: Texto do comentário.
  - `userId`: Usuário autor do comentário.
  - `ideaId`: Ideia comentada.

---

## 🔗 Principais Endpoints

- `GET /ideas` — Lista todas as ideias.
- `POST /ideas` — Cria uma nova ideia.
- `GET /ideas/:id` — Detalha uma ideia específica.
- `POST /ideas/:id/vote` — Vota em uma ideia (body: `{ userName }`).
- `POST /ideas/:id/comments` — Adiciona um comentário a uma ideia (body: `{ userId, message }`).
- `GET /users` — Lista todos os usuários.

---

## 💡 Regras de Negócio

- **Votação única:** O back-end impede que o mesmo usuário vote mais de uma vez na mesma ideia, validando pelo campo `votedBy`.
- **Validação de dados:** Todos os campos obrigatórios são validados antes de criar ideias, votos ou comentários.
- **Mensagens de erro:** Retorno padronizado para erros de negócio e validação.

---

## 🏗️ Como rodar o back-end

```bash
cd tibox-back
npm install
npx prisma migrate dev
npm run dev
```

O servidor estará disponível em [http://localhost:3001](http://localhost:3001) (ou porta definida no `.env`).

---

## ☁️ Hospedagem

- **Banco de Dados:** A instância do banco de dados é PostgreSQL e está hospedada na [Railway](https://railway.app/).
- **Servidor Back-end:** O aplicativo servidor está hospedado no [Render](https://render.com/) como um Web Service, disponível em:  
  [https://tibox-back.onrender.com](https://tibox-back.onrender.com)

---

## 📚 Observações

- O back-end está preparado para integração total com o front-end via API REST.
- O código está modularizado, com controllers para cada recurso.
- Prisma facilita a manutenção e evolução do banco de dados.
- Todas as regras de negócio críticas estão implementadas no back-end, garantindo integridade dos dados.

---

Feito para o teste da Tibox 🚀