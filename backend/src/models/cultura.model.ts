import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { SafraModel } from './safra.model';

@Table({ tableName: 'culturas', timestamps: true })
export class CulturaModel extends Model<CulturaModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  })
  id: number;

  @ForeignKey(() => SafraModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'safraid',
  })
  safraId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'nome',
  })
  nome: string; // Ex: Soja, Milho, Café

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
