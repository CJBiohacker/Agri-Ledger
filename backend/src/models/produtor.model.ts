import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { PropriedadeModel } from './propriedade.model';

@Table({ tableName: 'produtores' })
export class ProdutorModel extends Model<ProdutorModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  cpfCnpj: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @HasMany(() => PropriedadeModel)
  propriedades: PropriedadeModel[];
}
