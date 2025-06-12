import { SequelizeOptions } from 'sequelize-typescript';
import { ProdutorModel } from '../models/produtor.model';
import { PropriedadeModel } from '../models/propriedade.model';
import { SafraModel } from '../models/safra.model';
import { CulturaModel } from '../models/cultura.model';

export const sequelizeConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [ProdutorModel, PropriedadeModel, SafraModel, CulturaModel],
  sync: { force: false }, // Cria tabelas se não existirem (não apaga dados)
};
