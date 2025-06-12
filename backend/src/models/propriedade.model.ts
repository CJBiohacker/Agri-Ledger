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

@Table({ tableName: 'propriedades', timestamps: true })
export class PropriedadeModel extends Model<PropriedadeModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  })
  id: number;

  @ForeignKey(() => ProdutorModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'produtorid',
  })
  produtorId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'nome',
  })
  nome: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'cidade',
  })
  cidade: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'estado',
  })
  estado: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: 'areatotal',
  })
  areaTotal: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: 'areaagricultavel',
  })
  areaAgricultavel: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: 'areavegetacao',
  })
  areaVegetacao: number;

  @HasMany(() => SafraModel)
  safras: SafraModel[];

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
