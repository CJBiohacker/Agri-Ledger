import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { SafraModel } from './safra.model';

@Table({ tableName: 'culturas' })
export class CulturaModel extends Model<CulturaModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => SafraModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  safraId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string; // Ex: Soja, Milho, Café
}
