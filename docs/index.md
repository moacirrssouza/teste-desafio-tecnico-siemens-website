# Documentação Detalhada do Projeto

## 1. Estrutura de Pastas

A estrutura de pastas do projeto segue uma abordagem modular e organizada, separando as responsabilidades em diferentes diretórios:

```
/src
|-- @types          # Definições de tipos TypeScript
|-- assets          # Arquivos estáticos como imagens e CSS global
|-- components      # Componentes React reutilizáveis
|   |-- layout      # Componentes de layout (ex: MainLayout)
|   `-- ui          # Componentes de UI genéricos (ex: Button, Modal)
|-- config          # Configurações globais da aplicação
|-- features        # Funcionalidades principais da aplicação
|   `-- books       # Funcionalidade de livros
|       |-- components # Componentes específicos de livros
|       |-- hooks      # Hooks específicos de livros
|       |-- pages      # Páginas relacionadas a livros
|       `-- services   # Lógica de negócio e chamadas de API
|-- hooks           # Hooks React reutilizáveis
|-- models          # Modelos de dados da aplicação
|-- pages           # Páginas da aplicação
|-- routes          # Configuração de rotas
|-- services        # Serviços genéricos (API, etc.)
`-- store           # Configuração do gerenciamento de estado (Zustand)
```

## 2. Componentes

Os componentes são divididos em duas categorias principais:

*   **`components/ui`**: Componentes de interface de usuário genéricos e reutilizáveis, como `ConfirmDialog` e `FormModal`. Eles são projetados para serem independentes de qualquer lógica de negócio específica.
*   **`components/layout`**: Componentes que definem a estrutura visual da aplicação, como `AuthLayout` para páginas de autenticação e `MainLayout` para o layout principal da aplicação.
*   **`features/**/components`**: Componentes que são específicos de uma determinada funcionalidade. Por exemplo, `BookForm` e `BookList` estão dentro da funcionalidade de `books`.

## 3. Gerenciamento de Estado

O gerenciamento de estado é feito com o **Zustand**. A configuração principal do store pode ser encontrada em `src/store/store.ts`. O `rootReducer` em `src/store/rootReducer.ts` combina os diferentes stores da aplicação.

O store de livros, por exemplo, está localizado em `src/features/books/bookStore.ts` e é responsável por gerenciar o estado relacionado aos livros, como a lista de livros e o livro selecionado.

## 4. Roteamento

O roteamento da aplicação é gerenciado pelo **React Router**. O arquivo `src/routes/Router.tsx` define todas as rotas da aplicação, associando cada caminho a um componente de página específico. Ele também lida com rotas protegidas que exigem autenticação.

## 5. Serviços da API

A comunicação com a API é centralizada no diretório `src/services`. O arquivo `src/services/api.ts` contém a instância do **Axios** configurada com a URL base da API e interceptadores.

Os interceptadores, localizados em `src/services/api/interceptors`, são usados para:

*   **`authInterceptor.ts`**: Adicionar o token de autenticação a cada requisição.
*   **`errorInterceptor.ts`**: Tratar erros de API de forma global.

Os endpoints específicos para cada funcionalidade são definidos dentro da pasta `features`. Por exemplo, `src/features/books/services/bookService.ts` contém as funções para buscar, criar, atualizar e deletar livros.

## 6. Testes

Os testes são escritos com **Vitest** e **React Testing Library**. Os arquivos de teste estão localizados na pasta `tests`.

*   **`tests/unit`**: Contém os testes unitários. Por exemplo, `BookForm.validation.test.tsx` testa a lógica de validação do formulário de livros.
*   **`setup.ts`**: Arquivo de configuração para os testes, onde o ambiente de teste é configurado (por exemplo, `jsdom`).

Para executar os testes, você pode usar os seguintes comandos:

*   `npm test`: Executa os testes em modo de observação.
*   `npm run test:ui`: Abre a interface do Vitest para uma visualização mais interativa dos resultados dos testes.
*   `npm run test:coverage`: Gera um relatório de cobertura de testes.
