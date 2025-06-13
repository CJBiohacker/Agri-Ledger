# Agri-Ledger API

## Overview
The Agri-Ledger API is the backend for a management system for rural producers, their properties, harvests, and crops. The goal is to provide a robust, scalable, and secure platform for recording and managing agricultural information, facilitating traceability and decision-making.

## Technologies Used
- **Backend:** Node.js, NestJS, TypeScript
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Testing:** Jest (for unit and integration/e2e tests)
- **Containerization:** Docker
- **Linting & Formatting:** ESLint, Prettier
- **Security:** Helmet, CORS, Data Validation (class-validator, class-transformer)
- **API Documentation:** Swagger (OpenAPI) via `@nestjs/swagger`

## Architecture
The API follows a layered architecture, common in NestJS applications, promoting separation of concerns and modularity:
- **Controllers:** Responsible for handling HTTP requests, validating input data (using DTOs), and returning responses.
- **Services:** Contain the core business logic of the application.
- **Models/Repositories:** Data access layer, using Sequelize to interact with the PostgreSQL database.
- **Modules:** Group related components (controllers, services, models) by functionality.

*Architecture and data flow diagrams can be added to the `/docs/diagrams` folder for detailed visualization.*

## Getting Started

### Prerequisites
- Node.js (version >= 18.x recommended)
- Yarn or NPM
- Docker and Docker Compose (for development environment with database)
- PostgreSQL (if not using Docker for the database)

### Environment Setup
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-user/agri-ledger.git
    cd agri-ledger/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  **Configure environment variables:**
    - Copy the `.env.example` file (if it exists) to `.env` in the `backend` folder.
    - Fill in the necessary environment variables, such as:
      ```env
      # Application Settings
      PORT=3000
      NODE_ENV=development

      # PostgreSQL Database Settings with Sequelize
      DB_DIALECT=postgres
      DB_HOST=localhost
      DB_PORT=5432
      DB_USERNAME=your_db_user
      DB_PASSWORD=your_db_password
      DB_DATABASE=agri_ledger_db

      # Security Settings (example)
      JWT_SECRET=your_jwt_secret
      API_KEY=your_secure_api_key
      ```
    *Note: For production, use managed secrets (e.g., Google Secret Manager).*

4.  **(Optional) Start the database with Docker Compose:**
    If a `docker-compose.yml` is configured for the database:
    ```bash
    docker-compose up -d postgres_db # Replace 'postgres_db' with the database service name in docker-compose.yml
    ```
    Otherwise, ensure a PostgreSQL instance is running and accessible.

5.  **Run Sequelize migrations (if configured):**
    ```bash
    npm run migration:run
    ```

### Running the Application
```bash
npm run start:dev
```
The application will be available at `http://localhost:CONFIGURED_PORT` (e.g., `http://localhost:3000`).
The API's Swagger documentation will be accessible at `http://localhost:CONFIGURED_PORT/api-docs`.

## Project Structure (Backend)
The `backend` folder contains the NestJS application:
```
backend/
├── dist/                     # Compiled files (JavaScript)
├── node_modules/             # Project dependencies
├── src/                      # Source code (TypeScript)
│   ├── main.ts               # NestJS application entry point
│   ├── app.module.ts         # Root application module
│   ├── common/               # Utilities, global filters, interceptors, etc.
│   │   └── all-exceptions.filter.ts # Example of a global exception filter
│   ├── controllers/          # Controllers (e.g., producer.controller.ts)
│   ├── services/             # Services with business logic
│   ├── models/               # Sequelize Models/Entities
│   ├── dtos/                 # Data Transfer Objects for validation
│   ├── database/             # Database configuration (orm.config.ts) and migrations
│   ├── interfaces/           # TypeScript interfaces
│   └── utils/                # Utility functions
├── test/                     # Automated tests
│   ├── unit/                 # Unit tests (services, controllers, utils)
│   ├── integration/          # Integration tests (e2e for routes)
│   ├── mocks/                # Centralized mocks for tests
│   └── jest-e2e.json         # Jest configuration for e2e tests
├── coverage/                 # Test coverage reports
├── Dockerfile                # Defines the Docker image for the application
├── .dockerignore             # Specifies files to be ignored by Docker
├── jest.config.js            # Main Jest configuration
├── nest-cli.json             # NestJS CLI configuration
├── package.json              # Project metadata and dependencies
├── tsconfig.build.json       # TypeScript configuration for build
└── tsconfig.json             # Base TypeScript configuration
```

## API Endpoints (OpenAPI/Swagger Documentation)
Interactive API documentation, generated with Swagger (OpenAPI), is available at the `/api-docs` route when the application is running.
Example: `http://localhost:3000/api-docs`

This documentation details all available endpoints, their parameters, request/response bodies, and status codes.

## Tests
The project uses Jest for unit and integration tests.
- **Run all tests (unit and e2e):**
  ```bash
  npm run test
  ```
- **Run tests and generate coverage report:**
  ```bash
  npm run test:cov
  ```
  The coverage report will be generated in the `coverage/lcov-report/index.html` folder.
- **Run only integration (e2e) tests:**
  ```bash
  npm run test:e2e
  ```
- **Run only unit tests:**
  (May require configuring a specific script or using Jest CLI directly)
  ```bash
  npm run test:unit # If configured in package.json, or:
  # jest --config jest.config.js src # Example, adjust as needed
  ```

## Build and Deploy

### Build with Docker
1.  Navigate to the `backend` folder.
2.  Build the Docker image:
    ```bash
    docker build -t agri-ledger-api:latest .
    ```

### Deploy on Google Cloud Run
1.  **Authenticate with Google Cloud:**
    ```bash
    gcloud auth login
    gcloud auth configure-docker
    ```
2.  **Set your Google Cloud Project ID:**
    ```bash
    export PROJECT_ID="your-gcp-project-id"
    gcloud config set project $PROJECT_ID
    ```
3.  **Build and push the image to Artifact Registry (or Container Registry):**
    (Assuming you have a Docker repository named `agri-ledger-repo` in the `us-central1` region)
    ```bash
    docker tag agri-ledger-api:latest us-central1-docker.pkg.dev/$PROJECT_ID/agri-ledger-repo/agri-ledger-api:latest
    docker push us-central1-docker.pkg.dev/$PROJECT_ID/agri-ledger-repo/agri-ledger-api:latest
    ```
4.  **Deploy to Cloud Run:**
    ```bash
    gcloud run deploy agri-ledger-service \
      --image us-central1-docker.pkg.dev/$PROJECT_ID/agri-ledger-repo/agri-ledger-api:latest \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated \
      --port 8080 \ # Port exposed by Cloud Run, Dockerfile should expose app port (e.g., 3000)
      --set-env-vars NODE_ENV=production,PORT=3000,DB_HOST=...,DB_PORT=...,DB_USERNAME=...,DB_PASSWORD=...,DB_DATABASE=... # And other environment variables
    ```
    *Important: For `DB_HOST` in Cloud Run, configure the Cloud SQL instance IP or use the Cloud SQL Connection Socket. Passwords and secrets should be managed via Secret Manager and referenced in Cloud Run environment variables.*

## Useful Scripts (defined in `package.json`)
- `npm run build`: Compiles TypeScript code to JavaScript.
- `npm run format`: Formats code using Prettier.
- `npm run start`: Runs the application in production mode (after build).
- `npm run start:dev`: Runs the application in development mode with watch (nodemon).
- `npm run start:debug`: Runs the application in debug mode with watch.
- `npm run lint`: Runs ESLint for static code analysis.
- `npm run test`: Runs all tests.
- `npm run test:watch`: Runs tests in watch mode.
- `npm run test:cov`: Runs tests and generates coverage report.
- `npm run test:debug`: Runs tests in debug mode.
- `npm run test:e2e`: Runs e2e tests specifically.
- `npm run migration:generate <path/to/MigrationName>`: Generates a new Sequelize migration file (e.g., `npm run migration:generate src/database/migrations/CreateUsersTable`).
- `npm run migration:run`: Applies pending migrations to the database.
- `npm run migration:revert`: Reverts the last applied migration.

## Contribution
Contributions are welcome! Please follow these guidelines:
1.  Fork the project.
2.  Create a branch for your feature (`git checkout -b feature/new-feature`).
3.  Commit your changes (`git commit -am 'Add new feature'`).
4.  Push to the branch (`git push origin feature/new-feature`).
5.  Open a Pull Request.

Ensure that tests pass and that the code follows linting standards.

## License
This project is licensed under the MIT License. See the `LICENSE` file at the project root for more details.
