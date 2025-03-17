# Autenticação com OTP e JWT

Este projeto é um exemplo de um sistema de autenticação que utiliza OTP (One-Time Password) e JWT (JSON Web Tokens) para garantir a segurança das operações de login e registro. O sistema foi desenvolvido utilizando Node.js, Express, Prisma e várias outras bibliotecas modernas.

## Funcionalidades

- **Registro de Usuários**: Os usuários podem se registrar fornecendo um nome e um e-mail.
- **Login com OTP**: Após o registro, os usuários recebem um OTP por e-mail para fazer login.
- **Autenticação com JWT**: Após a validação do OTP, um JWT é gerado para autenticação subsequente.
- **Proteção de Rotas**: Rotas protegidas que requerem autenticação JWT para acesso.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para Node.js.
- **Prisma**: ORM para Node.js e TypeScript.
- **Zod**: Biblioteca de validação de esquema TypeScript-first.
- **JWT**: Para criação e verificação de tokens de autenticação.
- **Mailtrap**: Para envio de e-mails de teste.
- **Helmet**: Para segurança de aplicações Express.
- **CORS**: Para habilitar CORS com várias opções.

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- npm ou yarn instalado
- Conta no Mailtrap para envio de e-mails

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
  ```

2. Instale as dependências:
  ```bash
  npm install
  ```

3. Configure as variáveis de ambiente:
  ```bash
  JWT_SECRET=sua_chave_secreta_jwt
  MAILTRAP_TOKEN=seu_token_do_mailtrap
  DATABASE_URL=sua_url_do_banco_de_dados
  ```

4. Execute as migrações do Prisma:
  ```bash
  npx prisma migrate dev --name init
  ```

5. Inicie o servidor:
  ```bash
  npm run dev
  ```