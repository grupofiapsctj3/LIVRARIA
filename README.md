# CRUD Livros API

Este projeto estrutura o front-end da Biblioteca.

## Estrutura do Projeto

possuimos 2 componentes e 3 paginas configuradas a seguir:

```
/components
├── Footer
│   └── Footer.jsx
├── Navbar
│   └── Navbar.jsx
/pages
├── Error
│   └── Error.jsx
├── Home
│   └── Home.jsx
├── Livros
│   └── Livros.jsx
├── .env
├── App.css
├── App.jsx
├── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── README.md
├── vite.config.js
```

## Pré-requisitos

Antes de começar, certifique-se de ter instalado o seguinte:

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)

## Configuração do Ambiente

1. Clone este repositório para sua máquina local.
2. Navegue até o diretório do projeto.
4. Instale as dependências do projeto:
    ```bash
    npm install
    ```

## Executando o Projeto

1. Para iniciar o servidor de desenvolvimento, execute o comando:
    ```bash
    npm run dev
    ```
2. O servidor estará rodando na porta `3000`. Você pode acessar a API em `http://localhost:5173`.

## Dependências

- `react`: Framework frontend baseado em Node.
- `vite`: Framework facilitador para React.
- `styled-components`: Biblioteca para React baseada em CSS.
- `axios`: Biblioteca para conexao entre front e backend.

## Conclusão

Com esse app somos capazes de visualizar, editar, adicionar e excluir livros do catalogo da biblioteca.
