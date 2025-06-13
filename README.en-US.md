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

## Detailed Data Model

The Agri-Ledger API uses a relational data model to manage agricultural information. The primary keys of all main entities are UUIDs to ensure unique and distributed identifiers.

### Main Entities and Relationships

```mermaid
erDiagram
    PRODUCERS {
        UUID id PK
        String name
        String document
        DateTime createdAt
        DateTime updatedAt
    }

    PROPERTIES {
        UUID id PK
        UUID producerId FK
        String name
        String location
        Float totalArea
        DateTime createdAt
        DateTime updatedAt
    }

    HARVESTS {
        UUID id PK
        // UUID propertyId FK // Removed direct link, managed through PLANTINGS
        String name
        Date startDate
        Date endDate
        DateTime createdAt
        DateTime updatedAt
    }

    CROPS {
        UUID id PK
        String name
        DateTime createdAt
        DateTime updatedAt
    }

    PLANTINGS {
        UUID id PK
        UUID propertyId FK
        UUID harvestId FK
        UUID cropId FK
        Float plantedArea
        Date plantingDate
        Date estimatedHarvestDate
        Date actualHarvestDate
        Float harvestedQuantity
        DateTime createdAt
        DateTime updatedAt
    }

    PRODUCERS ||--o{ PROPERTIES : "owns"
    PROPERTIES ||--o{ PLANTINGS : "registers"
    HARVESTS ||--o{ PLANTINGS : "groups"
    CROPS ||--o{ PLANTINGS : "is_planted_as"
```

**Entity Descriptions:**

- **Producers (`producers`)**: Stores information about rural producers.
  - `id`: UUID, Primary Key.
  - `name`: Producer's name.
  - `document`: Document (CPF/CNPJ in Brazil, or other national identifier), unique.
- **Properties (`properties`)**: Represents properties belonging to producers.
  - `id`: UUID, Primary Key.
  - `producerId`: UUID, Foreign Key referencing `producers.id`.
  - `name`: Property name.
  - `location`: Textual description or coordinates of the location.
  - `totalArea`: Total area of the property in hectares.
- **Harvests (`harvests`)**: Defines harvest periods. These are conceptual periods (e.g., "Summer Harvest 2024") and are linked to specific properties through Plantings.
  - `id`: UUID, Primary Key.
  - `name`: Name/identifier of the harvest (e.g., "Soybean Harvest 2024/2025", "Summer Harvest 2024").
  - `startDate`: Start date of the harvest period.
  - `endDate`: End date of the harvest period.
- **Crops (`crops`)**: Lookup table for crop types (e.g., Soybean, Corn, Coffee).
  - `id`: UUID, Primary Key.
  - `name`: Crop name, unique.
- **Plantings (`plantings`)**: This is the central operational entity. It records the planting of a specific `Crop`, on a specific `Property`, during a specific `Harvest` period.
  - `id`: UUID, Primary Key.
  - `propertyId`: UUID, Foreign Key referencing `properties.id`.
  - `harvestId`: UUID, Foreign Key referencing `harvests.id`.
  - `cropId`: UUID, Foreign Key referencing `crops.id`.
  - `plantedArea`: Area planted with the crop in hectares for this specific planting.
  - `plantingDate`: Date the planting was carried out.
  - `estimatedHarvestDate`: Estimated date for harvesting this planting.
  - `actualHarvestDate`: Actual harvest date for this planting (optional).
  - `harvestedQuantity`: Quantity harvested from this planting (optional).

This model allows a `Property` to have multiple `Plantings`. Each `Planting` links a `Crop` to a `Harvest` period for that specific `Property`. This structure provides flexibility for managing diverse agricultural operations.

## Getting Started

### Prerequisites

- Node.js (version >= 18.x recommended)
- Yarn or NPM
- Docker and Docker Compose (for development environment with database)
- PostgreSQL (if not using Docker for the database)

### Environment Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-user/agri-ledger.git
   cd agri-ledger/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   # yarn install
   ```

3. **Configure environment variables:**

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

     # Security Settings
     JWT_SECRET=your_super_secret_key_here # Change in production!
     # API_KEY=your_secure_api_key # If using an additional global API Key
     ```

   *Note: For production, use strong, managed secrets (e.g., Google Secret Manager, AWS Secrets Manager, HashiCorp Vault). The `JWT_SECRET` is crucial for the security of authentication tokens.*

4. **(Optional) Start the database with Docker Compose:**

   If a `docker-compose.yml` is configured for the database:

   ```bash
   docker-compose up -d postgres_db # Replace 'postgres_db' with the database service name in docker-compose.yml
   ```

   Otherwise, ensure a PostgreSQL instance is running and accessible.

5. **Run Sequelize migrations (if configured):**

   ```bash
   npm run migration:run
   ```

   This will create the tables in the database as defined in the Sequelize models and migrations.

## Authentication and Authorization

The API uses JSON Web Tokens (JWT) for authentication and a role-based system for authorization.

### Authentication Flow

1. **Login**: The user sends credentials (CPF/CNPJ and password) to the `POST /auth/login` endpoint.
   - If the credentials are valid, the API returns an `access_token` (JWT).
2. **Accessing Protected Endpoints**: To access endpoints that require authentication, the client must include the `access_token` in the `Authorization` header as a Bearer Token.
   - Example: `Authorization: Bearer <your_access_token>`

### User Creation and First Admin

- The `POST /producers` endpoint is **public**. This allows new producers (users) to be registered.
- When creating a producer, their `roles` can be specified. To create an administrator, include `"admin"` in the list of roles.
- **Important**: It is recommended that after creating the first administrator user, additional measures be implemented to restrict the creation of new administrators or even protect the `POST /producers` endpoint, depending on the application's security requirements in production.

### Roles

Two main roles are defined:

- `admin`: Has full access to all API resources.
- `generic`: Has limited access, typically to view and manage only their own data (this fine-grained control can be implemented in the services as needed).

Specific endpoints in the `ProdutorController` (and others that may be created) are protected using `@UseGuards(JwtAuthGuard, RolesGuard)` and decorated with `@Roles(Role.Admin)` or `@Roles(Role.Admin, Role.Generic)` to specify which roles have permission.

### JWT Secret

The `JWT_SECRET` used to sign and verify tokens is configured via environment variables for enhanced security, as specified in the `.env` file.

## API Documentation (Swagger)

Interactive API documentation, generated with Swagger (OpenAPI), is available at `/api-docs` when the application is running (e.g., `http://localhost:3000/api-docs`).

The Swagger documentation:

- Lists all available endpoints.
- Shows which endpoints are protected and require authentication (usually marked with a lock icon).
- Allows testing the authentication flow:
  1. Use the `POST /auth/login` endpoint to obtain a token.
  2. Click the "Authorize" button in the Swagger UI and paste the `access_token` (prefixed with `Bearer`) to authenticate your requests within the interface.
- Details the DTOs (Data Transfer Objects) for request and response bodies.

## Testing

The project uses Jest for unit and integration tests.

- **Run all tests (unit and e2e):**

  ```bash
  npm test
  ```

- **Run only unit tests:**

  ```bash
  npm run test:unit
  ```

- **Run only e2e tests:**

  ```bash
  npm run test:e2e
  ```

- **Run tests with coverage:**

  ```bash
  npm run test:cov
  ```

### Build with Docker

1. Navigate to the `backend` folder.
2. Build the Docker image:

   ```bash
   docker build -t agri-ledger-api .
   ```

### Deploy on Google Cloud Run

1. **Authenticate with Google Cloud:**

   ```bash
   gcloud auth login
   gcloud auth configure-docker
   ```

2. **Set your Google Cloud Project ID:**

   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Build and push the image to Artifact Registry (or Container Registry):**

   ```bash
   docker tag agri-ledger-api gcr.io/YOUR_PROJECT_ID/agri-ledger-api
   docker push gcr.io/YOUR_PROJECT_ID/agri-ledger-api
   ```

4. **Deploy to Cloud Run:**

   ```bash
   gcloud run deploy agri-ledger-api --image gcr.io/YOUR_PROJECT_ID/agri-ledger-api --platform managed --region YOUR_REGION --allow-unauthenticated
   ```

## Useful Scripts (defined in `package.json`)

- `npm run build`: Compiles TypeScript code to JavaScript.
- `npm run format`: Formats code using Prettier.
- `npm run lint`: Lints code using ESLint.
- `npm run start`: Starts the application (for production).
- `npm run start:dev`: Starts the application in development mode with hot-reloading.
- `npm run start:prod`: Starts the application from compiled files (for production testing).
- `npm run migration:generate src/database/migrations/YourMigrationName`: Generates a new migration file.
- `npm run migration:run`: Runs all pending migrations.
- `npm run migration:revert`: Reverts the last executed migration.

## Contribution

1. Fork the project.
2. Create a branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
