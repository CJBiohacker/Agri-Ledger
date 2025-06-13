import { SequelizeOptions } from 'sequelize-typescript';
import { ProdutorModel } from '../models/produtor.model';
import { PropriedadeModel } from '../models/propriedade.model';
import { SafraModel } from '../models/safra.model';
import { CulturaModel } from '../models/cultura.model';
import { PlantioModel } from '../models/plantio.model';

export const sequelizeConfig: SequelizeOptions = {
  dialect: process.env.DB_DIALECT as any as SequelizeOptions['dialect'],
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: process.env.NODE_ENV === 'development' ? console.log : false, // Log apenas em desenvolvimento
  models: [
    ProdutorModel,
    PropriedadeModel,
    SafraModel,
    CulturaModel,
    PlantioModel,
  ],
  sync: { force: false }, // Cria tabelas se não existirem (não apaga dados)
};
