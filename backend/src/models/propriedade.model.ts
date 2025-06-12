import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProdutorModel } from './produtor.model';
import { SafraModel } from './safra.model';

@Table({ tableName: 'propriedades' })
export class PropriedadeModel extends Model<PropriedadeModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => ProdutorModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  produtorId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cidade: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  estado: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  areaTotal: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  areaAgricultavel: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  areaVegetacao: number;

  @HasMany(() => SafraModel)
  safras: SafraModel[];
}
