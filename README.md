# crud-person-ts-api

Este projeto é um teste proposto para avaliação de conhecimentos técnicos e qualidade do código. O objetivo é observar a linha de raciocinio e as praticas de qualidade utilizadas.

## Descrição do projeto

O projeto consiste no desenvolvimento de um CRUD de pessoas, contemplando as operações básicas de criação, leitura, atualização e deleção, além da leitura por filtragem de parâmetros.

##  Funcionalidades
- Incluir uma pessoa;
- Consultar uma pessoa pelo identificador;
- Consultar uma pessoa a partir de um dos filtros (Nome / CPF / Data / Pais / Estado / Cidade) (Nenhum filtro é obrigatório)
- Alterar uma pessoa;
- Excluir uma pessoa;

## Pré-requisitos

Para rodar a aplicação na sua máquina, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/try/download/compass). Além delas você vai precisar de um editor de código como o [VSCode](https://code.visualstudio.com/). 
Para testar a aplicação na sua máquina, você também vai precisar ter instalado em sua máquina as seguintes ferramentas: [DynamoDB_Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html), [AWS_SAM_CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html), [Docker](https://www.docker.com/products/docker-desktop).

## Rodando a aplicação

```bash
# Clone este repositório
$ git clone <https://github.com/Wisinewski/crud-person-ts-api-serverless>

# Acesse a pasta do projeto
$ cd crud-person-ts-api-serverless

# Instale o typescript globalmente
$ npm install -g typescript

# Instale as dependências do projeto
$ npm install

# Se desejar, execute os testes unitários
$ npm test

# Execute a aplicação
$ npm run dev

# O servidor iniciará na porta 3000, acesse <http://127.0.0.1:3000>

# Para testar e verificar a documentação das APIs com o Swagger, acesse <http://person-crud-swagger-bucket.s3-website-us-east-1.amazonaws.com>
```

## Tecnologias utilizadas

As seguintes tecnologias foram utilizadas no desenvolvimento do projeto:

- [Node.js] -> Interpretador de código javascript para back-end.
- [TypeScript] -> Transformar javascript em linguagem tipada e compilada.
- [Express] -> Framework para criar APIs.
- [MongoDB] -> Banco de dados.

Outras dependências:

- [jest] -> Framework de teste unitário.
- [rimraf] -> Automatizar a exclusão da pasta onde é gerado o código compilado.
- [git-commit-msg-linter] -> Padronizar as mensagens dos commits ao forçar o uso da especificação Conventional Commits.
- [husky] -> Criar gatilho pré-commit para testar e garantir que o código a ser commitado é funcional.
- [supertest] -> Forjar requisições.
- [swagger-ui-express] -> Documentar e consumir as APIs.
- [validator] -> Validar os parâmetros das requisições. Usado pra validar os e-mails
- [cpf-cnpj-validator] -> Validar os CPFs fornecidos.
- [migrate-mongo] -> Ferramenta de migração de banco de dados.