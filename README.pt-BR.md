# Agri-Ledger API

## Visão Geral
O Agri-Ledger API é o backend para um sistema de gestão de produtores rurais, suas propriedades, safras e culturas. O objetivo é fornecer uma plataforma robusta, escalável e segura para registrar e gerenciar informações agrícolas, facilitando a rastreabilidade e a tomada de decisões.

## Tecnologias Utilizadas
- **Backend:** Node.js, NestJS, TypeScript
- **Banco de Dados:** PostgreSQL
- **ORM:** Sequelize
- **Testes:** Jest (para testes unitários e de integração/e2e)
- **Contêinerização:** Docker
- **Linting e Formatação:** ESLint, Prettier
- **Segurança:** Helmet, CORS, Validação de Dados (class-validator, class-transformer)
- **Documentação da API:** Swagger (OpenAPI) via `@nestjs/swagger`

## Arquitetura
A API segue uma arquitetura em camadas, comum em aplicações NestJS, promovendo separação de responsabilidades e modularidade:
- **Controllers:** Responsáveis por lidar com as requisições HTTP, validar dados de entrada (usando DTOs) e retornar respostas.
- **Services:** Contêm a lógica de negócio principal da aplicação.
- **Models/Repositories:** Camada de acesso a dados, utilizando Sequelize para interagir com o banco de dados PostgreSQL.
- **Modules:** Agrupam componentes relacionados (controllers, services, models) por funcionalidade.

*Diagramas de arquitetura e fluxo de dados podem ser adicionados à pasta `/docs/diagrams` para visualização detalhada.*

## Como Começar

### Pré-requisitos
- Node.js (versão >= 18.x recomendada)
- Yarn ou NPM
- Docker e Docker Compose (para ambiente de desenvolvimento com banco de dados)
- PostgreSQL (se não for utilizar Docker para o banco)

### Configuração do Ambiente
1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/agri-ledger.git
    cd agri-ledger/backend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    # yarn install
    ```
3.  **Configure as variáveis de ambiente:**
    - Copie o arquivo `.env.example` (se existir) para `.env` na pasta `backend`.
    - Preencha as variáveis de ambiente necessárias, como:
      ```env
      # Configurações da Aplicação
      PORT=3000
      NODE_ENV=development

      # Configurações do Banco de Dados PostgreSQL com Sequelize
      DB_DIALECT=postgres
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=seu_usuario_db
      DB_PASSWORD=sua_senha_db
      DB_DATABASE=agri_ledger_db

      # Configurações de Segurança (exemplo)
      JWT_SECRET=seu_segredo_jwt
      API_KEY=sua_api_key_segura
      ```
    *Nota: Para produção, utilize segredos gerenciados (ex: Google Secret Manager).*

4.  **(Opcional) Suba o banco de dados com Docker Compose:**
    Se houver um `docker-compose.yml` configurado para o banco:
    ```bash
    docker-compose up -d postgres_db # Substitua 'postgres_db' pelo nome do serviço do banco no docker-compose.yml
    ```
    Caso contrário, certifique-se de que uma instância do PostgreSQL esteja rodando e acessível.

5.  **Rode as migrations do Sequelize (se configuradas):**
    ```bash
    npm run migration:run
    ```

### Rodando a Aplicação
```bash
npm run start:dev
```
A aplicação estará disponível em `http://localhost:PORTA_CONFIGURADA` (ex: `http://localhost:3000`).
A documentação Swagger da API estará acessível em `http://localhost:PORTA_CONFIGURADA/api-docs`.

## Estrutura do Projeto (Backend)
A pasta `backend` contém a aplicação NestJS:
```
backend/
├── dist/                     # Arquivos compilados (JavaScript)
├── node_modules/             # Dependências do projeto
├── src/                      # Código fonte da aplicação (TypeScript)
│   ├── main.ts               # Ponto de entrada da aplicação NestJS
│   ├── app.module.ts         # Módulo raiz da aplicação
│   ├── common/               # Utilitários, filtros globais, interceptors, etc.
│   │   └── all-exceptions.filter.ts # Exemplo de filtro de exceção global
│   ├── controllers/          # Controladores (ex: produtor.controller.ts)
│   ├── services/             # Serviços com a lógica de negócio
│   ├── models/               # Modelos/Entidades do Sequelize
│   ├── dtos/                 # Data Transfer Objects para validação
│   ├── database/             # Configuração do banco (orm.config.ts) e migrations
│   ├── interfaces/           # Interfaces TypeScript
│   └── utils/                # Funções utilitárias
├── test/                     # Testes automatizados
│   ├── unit/                 # Testes unitários (services, controllers, utils)
│   ├── integration/          # Testes de integração (e2e para as rotas)
│   ├── mocks/                # Mocks centralizados para testes
│   └── jest-e2e.json         # Configuração do Jest para testes e2e
├── coverage/                 # Relatórios de cobertura de testes
├── Dockerfile                # Define a imagem Docker para a aplicação
├── .dockerignore             # Especifica arquivos a serem ignorados pelo Docker
├── jest.config.js            # Configuração principal do Jest
├── nest-cli.json             # Configuração do NestJS CLI
├── package.json              # Metadados do projeto e dependências
├── tsconfig.build.json       # Configuração do TypeScript para build
└── tsconfig.json             # Configuração base do TypeScript
```

## Endpoints da API (Documentação OpenAPI/Swagger)
A documentação interativa da API, gerada com Swagger (OpenAPI), está disponível na rota `/api-docs` quando a aplicação está em execução.
Exemplo: `http://localhost:3000/api-docs`

Esta documentação detalha todos os endpoints disponíveis, seus parâmetros, corpos de requisição/resposta e códigos de status.

## Testes
O projeto utiliza Jest para testes unitários e de integração.
- **Rodar todos os testes (unitários e e2e):**
  ```bash
  npm run test
  ```
- **Rodar testes e gerar relatório de cobertura:**
  ```bash
  npm run test:cov
  ```
  O relatório de cobertura será gerado na pasta `coverage/lcov-report/index.html`.
- **Rodar apenas os testes de integração (e2e):**
  ```bash
  npm run test:e2e
  ```
- **Rodar apenas os testes unitários:**
  (Pode ser necessário configurar um script específico ou usar o Jest CLI diretamente)
  ```bash
  npm run test:unit # Se configurado no package.json, ou:
  # jest --config jest.config.js src # Exemplo, ajuste conforme necessário
  ```

## Build e Deploy

### Build com Docker
1.  Navegue até a pasta `backend`.
2.  Construa a imagem Docker:
    ```bash
    docker build -t agri-ledger-api:latest .
    ```

### Deploy no Google Cloud Run
1.  **Autentique-se no Google Cloud:**
    ```bash
    gcloud auth login
    gcloud auth configure-docker
    ```
2.  **Defina o ID do seu projeto Google Cloud:**
    ```bash
    export PROJECT_ID="seu-gcp-project-id"
    gcloud config set project $PROJECT_ID
    ```
3.  **Construa e envie a imagem para o Artifact Registry (ou Container Registry):**
    (Assumindo que você tem um repositório Docker chamado `agri-ledger-repo` na região `us-central1`)
    ```bash
    docker tag agri-ledger-api:latest us-central1-docker.pkg.dev/$PROJECT_ID/agri-ledger-repo/agri-ledger-api:latest
    docker push us-central1-docker.pkg.dev/$PROJECT_ID/agri-ledger-repo/agri-ledger-api:latest
    ```
4.  **Faça o deploy no Cloud Run:**
    ```bash
    gcloud run deploy agri-ledger-service \
      --image us-central1-docker.pkg.dev/$PROJECT_ID/agri-ledger-repo/agri-ledger-api:latest \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated \
      --port 8080 \ # Porta que o Cloud Run expõe, o Dockerfile deve expor a porta da aplicação (ex: 3000)
      --set-env-vars NODE_ENV=production,PORT=3000,DB_HOST=...,DB_PORT=...,DB_USERNAME=...,DB_PASSWORD=...,DB_DATABASE=... # E outras variáveis de ambiente
    ```
    *Importante: Para `DB_HOST` no Cloud Run, configure o IP da instância do Cloud SQL ou use o Socket de Conexão do Cloud SQL. As senhas e segredos devem ser gerenciados via Secret Manager e referenciados nas variáveis de ambiente do Cloud Run.*

## Scripts Úteis (definidos em `package.json`)
- `npm run build`: Compila o código TypeScript para JavaScript.
- `npm run format`: Formata o código usando Prettier.
- `npm run start`: Executa a aplicação em modo de produção (após o build).
- `npm run start:dev`: Executa a aplicação em modo de desenvolvimento com watch (nodemon).
- `npm run start:debug`: Executa a aplicação em modo de debug com watch.
- `npm run lint`: Executa o ESLint para análise estática do código.
- `npm run test`: Roda todos os testes.
- `npm run test:watch`: Roda os testes em modo watch.
- `npm run test:cov`: Roda os testes e gera o relatório de cobertura.
- `npm run test:debug`: Roda os testes em modo de debug.
- `npm run test:e2e`: Roda especificamente os testes e2e.
- `npm run migration:generate <path/to/MigrationName>`: Gera um novo arquivo de migration do Sequelize (ex: `npm run migration:generate src/database/migrations/CreateUsersTable`).
- `npm run migration:run`: Aplica as migrations pendentes no banco de dados.
- `npm run migration:revert`: Reverte a última migration aplicada.

## Contribuição
Contribuições são bem-vindas! Por favor, siga estas diretrizes:
1.  Faça um fork do projeto.
2.  Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3.  Faça commit de suas mudanças (`git commit -am 'Adiciona nova feature'`).
4.  Faça push para a branch (`git push origin feature/nova-feature`).
5.  Abra um Pull Request.

Certifique-se de que os testes passam e que o código segue os padrões de linting.

## Licença
Este projeto é licenciado sob a Licença MIT. Veja o arquivo `LICENSE` na raiz do projeto para mais detalhes.
