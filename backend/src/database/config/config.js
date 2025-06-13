require('dotenv').config(); // Carrega as variáveis de ambiente do .env

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
  test: {
    username: process.env.DB_USERNAME_TEST || process.env.DB_USERNAME, // Permite um usuário de teste diferente
    password: process.env.DB_PASSWORD_TEST || process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST || 'agri_ledger_test_db', // Banco de dados específico para testes
    host: process.env.DB_HOST_TEST || process.env.DB_HOST,
    port: Number(process.env.DB_PORT_TEST || process.env.DB_PORT),
    dialect: process.env.DB_DIALECT_TEST || process.env.DB_DIALECT,
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME_PROD || process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD_PROD || process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_PROD || process.env.DB_DATABASE,
    host: process.env.DB_HOST_PROD || process.env.DB_HOST,
    port: Number(process.env.DB_PORT_PROD || process.env.DB_PORT),
    dialect: process.env.DB_DIALECT_PROD || process.env.DB_DIALECT,
    logging: false,
    // Adicionar aqui configurações específicas de produção, como SSL, pool de conexões, etc.
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false // Ajuste conforme a configuração do seu servidor de BD
    //   }
    // }
  },
};
