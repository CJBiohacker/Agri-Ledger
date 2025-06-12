import { SequelizeOptions } from 'sequelize-typescript';

export const sequelizeConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'agri_ledger',
  logging: false,
};
