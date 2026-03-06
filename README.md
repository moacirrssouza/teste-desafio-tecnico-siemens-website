# Library Management System - Frontend (React)

Uma aplicação web moderna desenvolvida com **React**, **TypeScript** e **Vite** para gerenciar um sistema de biblioteca com consulta, cadastro e manutenção de gêneros, autores e livros.

## 🎯 Características

### Funcionalidades Principais
- ✅ CRUD completo para Gêneros, Autores e Livros
- ✅ Interface responsiva e moderna
- ✅ Consumo de API REST com axios
- ✅ Gerenciamento de estado com Zustand
- ✅ Rotas com React Router v6
- ✅ Validação de formulários
- ✅ Testes unitários com Vitest
- ✅ Interceptadores HTTP
- ✅ Configuração por ambiente

### Regras de Negócio Implementadas
- Um gênero pode possuir N livros
- Um autor pode possuir N livros
- Cada livro pertence a apenas um autor e um gênero

## 🏗️ Arquitetura e Estrutura

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── GenreList.tsx
│   ├── GenreForm.tsx
│   ├── AuthorList.tsx
│   ├── AuthorForm.tsx
│   ├── BookList.tsx
│   ├── BookForm.tsx
│   └── index.ts
├── pages/              # Páginas da aplicação
│   ├── HomePage.tsx
│   ├── GenresPage.tsx
│   ├── AuthorsPage.tsx
│   ├── BooksPage.tsx
│   └── index.ts
├── services/           # Serviços API
│   ├── genreService.ts
│   ├── authorService.ts
│   ├── bookService.ts
│   └── index.ts
├── store/              # Gerenciamento de estado (Zustand)
│   ├── genreStore.ts
│   ├── authorStore.ts
│   ├── bookStore.ts
├── hooks/              # Custom hooks
│   └── useEntities.ts
├── interfaces/         # Interfaces e tipos TypeScript
│   └── index.ts
├── utils/              # Utilitários
│   └── apiClient.ts    # Configuração Axios com interceptadores
├── __tests__/          # Testes unitários
│   ├── services.test.ts
│   └── stores.test.ts
├── App.tsx             # Componente raiz
├── App.css             # Estilos
└── main.tsx            # Entrada da aplicação
```

## 🚀 Boas Práticas Implementadas

### Arquitetura
- ✅ **Separação de responsabilidades**: Componentes, serviços, stores e hooks bem definidos
- ✅ **Injeção de dependência**: Através de props e hooks
- ✅ **DRY (Don't Repeat Yourself)**: Reutilização máxima de componentes
- ✅ **SOLID Principles**: Aplicados nos serviços e stores

### Frontend
- ✅ **Componentes funcionais**: Utilizando React Hooks
- ✅ **TypeScript**: Tipagem forte em toda a aplicação
- ✅ **Validação de formulários**: Validação client-side com feedback de erro
- ✅ **Tratamento de erros**: Captura e tratamento de exceções
- ✅ **Mensagens de feedback**: Alertas de sucesso e erro
- ✅ **Responsive Design**: Funciona em dispositivos móveis

### API Integration
- ✅ **Interceptadores HTTP**: Autorização automática, tratamento de erros
- ✅ **Tipagem de dados**: Interfaces para respostas da API
- ✅ **DTOs**: Objetos de transferência de dados para requisições
- ✅ **Configuração por ambiente**: .env para diferentes ambientes

### State Management
- ✅ **Zustand**: Gerenciamento de estado simples e eficiente
- ✅ **Custom hooks**: Encapsulamento de lógica do store
- ✅ **Seleção de estado**: Evita re-renders desnecessários

## 📋 Pré-requisitos

- **Node.js**: v16 ou superior
- **npm**: v8 ou superior
- **Backend API**: Rodando em `http://localhost:5000` (configurável via `.env`)

## 🔧 Instalação

### 1. Clonar o repositório
```bash
git clone <repository-url>
cd teste-desafio-tecnico-siemens-website
```

### 2. Instalar dependências
```bash
npm install
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie arquivos `.env` para diferentes ambientes:

**`.env` (Development)**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

**`.env.production` (Production)**
```
VITE_API_BASE_URL=https://api.seu-dominio.com/api
```

## 🎮 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```
Acesse `http://localhost:5173` no seu navegador.

### Build para Produção
```bash
npm run build
```

### Preview da Build de Produção
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 🧪 Testes

### Executar testes
```bash
npm run test
```

### Executar testes em modo watch
```bash
npm run test -- --watch
```

### Interface gráfica de testes
```bash
npm run test:ui
```

### Cobertura de testes
```bash
npm run test:coverage
```

## 🌍 Endpoints da API

A aplicação consome os seguintes endpoints da API:

### Gêneros
- `GET /api/v1/genres` - Listar todos os gêneros
- `GET /api/v1/genres/{id}` - Obter gênero por ID
- `POST /api/v1/genres` - Criar novo gênero
- `PUT /api/v1/genres/{id}` - Atualizar gênero
- `DELETE /api/v1/genres/{id}` - Deletar gênero

### Autores
- `GET /api/v1/authors` - Listar todos os autores
- `GET /api/v1/authors/{id}` - Obter autor por ID
- `POST /api/v1/authors` - Criar novo autor
- `PUT /api/v1/authors/{id}` - Atualizar autor
- `DELETE /api/v1/authors/{id}` - Deletar autor

### Livros
- `GET /api/v1/books` - Listar todos os livros
- `GET /api/v1/books/{id}` - Obter livro por ID
- `POST /api/v1/books` - Criar novo livro
- `PUT /api/v1/books/{id}` - Atualizar livro
- `DELETE /api/v1/books/{id}` - Deletar livro

## 📊 Structure de Dados

### Genre (Gênero)
```typescript
interface Genre {
  id: string | number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

### Author (Autor)
```typescript
interface Author {
  id: string | number;
  name: string;
  email?: string;
  biography?: string;
  birthDate?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

### Book (Livro)
```typescript
interface Book {
  id: string | number;
  title: string;
  authorId: string | number;
  genreId: string | number;
  description?: string;
  publishDate?: string;
  isbn?: string;
  author?: Author;
  genre?: Genre;
  createdAt?: string;
  updatedAt?: string;
}
```

## 🎨 Componentes

### GenreList
Lista todas os gêneros com opções de editar e deletar.

### GenreForm
Formulário para criar ou editar um gênero.

### AuthorList
Lista todos os autores com opções de editar e deletar.

### AuthorForm
Formulário para criar ou editar um autor.

### BookList
Lista todos os livros com opções de editar e deletar.

### BookForm
Formulário para criar ou editar um livro, com seleção de autor e gênero.

## 🔐 Segurança

- ✅ Validação de entrada em formulários
- ✅ Tratamento de erros de API
- ✅ Interceptadores HTTP para autorização
- ✅ Tipagem TypeScript para segurança de tipo

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop (1920px e acima)
- Tablet (768px - 1919px)
- Mobile (até 767px)

## � Documentação Adicional

Para mais informações sobre o projeto, consulte:

- **[TECHNICAL_REQUIREMENTS.md](TECHNICAL_REQUIREMENTS.md)** - Todos os 10 requisitos técnicos (Boas Práticas, State Management, Rotas, Models, Serviços, Interfaces, Environments, Store, Interceptors, Testes)
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Arquitetura e padrões de design
- **[QUICKSTART.md](QUICKSTART.md)** - Guia rápido para começar
- **[INTEGRATION.md](INTEGRATION.md)** - Como integrar com o backend .NET
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Como fazer deploy
- **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - Índice completo da documentação

## �🐛 Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### API não está respondendo
- Verifique se o backend está rodando em `http://localhost:5000`
- Verifique a configuração em `.env`

### Porta 5173 já está em uso
```bash
npm run dev -- --port 3000
```

## 📚 Tecnologias Utilizadas

- **React 19**: Framework UI
- **TypeScript**: Tipagem estática
- **Vite**: Build tool moderno
- **React Router v6**: Roteamento
- **Zustand**: State management
- **Axios**: HTTP client
- **Vitest**: Test framework
- **ESLint**: Code linting

## 📄 Licença

Este projeto é parte do desafio técnico Siemens.

## 👨‍💻 Contribuições

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## 📞 Suporte

Para dúvidas ou problemas, por favor abra uma issue no repositório.

---

**Desenvolvido com ❤️ para o desafio técnico Siemens**
