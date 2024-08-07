# Gerenciamento de Galáxias de Star Wars

Esta é a API de Gerenciamento de Galáxias do Star Wars, desenvolvida para o Desafio Fusion Back End. A API foi construída utilizando TypeScript e Node.js com o framework NestJS. 

## Funcionalidades

- Gerenciamento de Planetas, Sistemas Solares, Personagens e Naves Espaciais.
- É possível criar, listar, obter todos, obter um específico, atualizar e deletar um planeta, sistema solar, personagem ou nave espacial.

## Tecnologias Utilizadas

- **Node.js**,
- **NestJS**,
- **TypeScript**,
- **JWT**,
- **MySQL**,
- **Swagger**,
- **Heroku**,
- **Winston**.

## Autenticação e Autorização
- Os usuários são autenticados pelo JWT e possuem um tolken de acesso à end-points protegidos.

## Banco de Dados
- **MySQL**: Onde esta armazenado todos os Planetas, Sistemas Solares, Personagens e Naves Espaciais.

## Documentação
- Foi utilizado o Swagger para a documentação do projeto.

## Deploy
- link: https://star-wars-api-fusion-89843a8d185f.herokuapp.com

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o banco de dados MySQL no arquivo `ormconfig.json`:
    ```json
    {
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "seu-usuario",
      "password": "sua-senha",
      "database": "star-wars-db",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }
    ```

4. Execute as migrações (se houver):
    ```bash
    npm run typeorm migration:run
    ```

5. Inicie a aplicação:
    ```bash
    npm run start:dev
    ```

## Uso

### Autenticação

A API utiliza JWT para autenticação. Para acessar os endpoints protegidos, você precisa primeiro se autenticar e obter um token JWT.

### Documentação da API

A documentação da API pode ser acessada através do Swagger. Após iniciar a aplicação, acesse:
