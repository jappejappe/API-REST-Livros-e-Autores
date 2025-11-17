# Inventário de Livros e Autores

Sistema de gerenciamento de inventário de livros e autores com backend Node.js/Express e frontend React.

## Estrutura do Projeto

```
├── backend/                 # API Node.js/Express
│   ├── controllers/         # Controladores (Authors e Books)
│   ├── models/             # Modelos de dados
│   ├── routes/             # Rotas da API
│   ├── data/               # Armazenamento em memória
│   ├── middleware/         # Middlewares customizados
│   └── app.js              # Aplicação principal
├── frontend/               # Aplicação React
│   └── src/
│       ├── components/     # Componentes React
│       ├── services/       # Camada de serviços para API
│       ├── hooks/          # Hooks customizados
│       └── App.jsx         # Componente principal
└── README.md
```

## Como Executar

### 1. Instalar Dependências

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend  
npm install
```

### 2. Executar o Projeto

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
O servidor estará disponível em http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
A aplicação estará disponível em http://localhost:3000

### 3. Acessar a Aplicação

Abra seu navegador e acesse: http://localhost:3000

O sistema já vem com alguns dados de exemplo (3 autores e 3 livros) para demonstração.

## Funcionalidades

- **Livros**: CRUD completo (Create, Read, Update, Delete)
- **Autores**: CRUD simples
- **Relacionamentos**: Livros associados a autores
- **Validação**: Validação de dados no backend e frontend
- **Armazenamento**: Arrays em memória (sem persistência entre reinicializações)

## API Endpoints

### Autores
- `GET /api/authors` - Listar todos os autores
- `POST /api/authors` - Criar novo autor
- `GET /api/authors/:id` - Obter autor específico
- `PUT /api/authors/:id` - Atualizar autor existente
- `DELETE /api/authors/:id` - Deletar autor

### Livros
- `GET /api/books` - Listar todos os livros
- `POST /api/books` - Criar novo livro
- `GET /api/books/:id` - Obter livro específico
- `PUT /api/books/:id` - Atualizar livro existente
- `DELETE /api/books/:id` - Deletar livro

## Funcionalidades Implementadas

### Cadastro de Livros
- **Título** (obrigatório): Nome do livro
- **Resumo** (obrigatório): Descrição sobre o livro
- **Autor** (obrigatório): Seleção de autor cadastrado
- **Ano de Publicação**: Quando o livro foi publicado
- **Gênero**: Categoria do livro (Ficção, Romance, etc.)
- **Qualidade**: Avaliação de 1 a 5 estrelas
- **Número de Páginas**: Quantidade de páginas
- **ISBN**: Código internacional do livro
- **Idioma**: Idioma do livro
- **Editora**: Casa publicadora

### Cadastro de Autores
- **Nome** (obrigatório): Nome completo do autor
- **Biografia**: Informações sobre o autor
- **Ano de Nascimento**: Quando o autor nasceu
- **Nacionalidade**: País de origem


### Funcionalidades do Sistema
-  CRUD completo para livros (Criar, Ler, Atualizar, Deletar)
-  CRUD simples para autores
-  Validação de dados no backend e frontend
-  Relacionamento entre livros e autores
-  Interface responsiva e intuitiva
-  Tratamento de erros
-  Dados de exemplo incluídos
-  Armazenamento em memória (reinicia ao parar o servidor)

### Diferenciação POST vs PUT
- **POST**: Criar novos recursos (livros/autores)
- **PUT**: Atualizar recursos existentes por ID
- Validação adequada para cada operação

## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- UUID para geração de IDs
- Validação de dados customizada
- CORS habilitado

### Frontend
- React 18
- React Router DOM
- Axios para requisições HTTP
- CSS Grid e Flexbox
- Vite como bundler
