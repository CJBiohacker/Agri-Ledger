import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { PropriedadeModel } from './propriedade.model';

@Table({ tableName: 'produtores', timestamps: true })
export class ProdutorModel extends Model<ProdutorModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: 'cpfcnpj',
  })
  cpfCnpj: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'nome',
  })
  nome: string;

  @HasMany(() => PropriedadeModel)
  propriedades: PropriedadeModel[];

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'createdat',
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'updatedat',
  })
  declare updatedAt: Date;
}
