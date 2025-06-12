import { Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { PropriedadeModel } from './propriedade.model';
import { CulturaModel } from './cultura.model';

@Table({ tableName: 'safras' })
export class SafraModel extends Model<SafraModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => PropriedadeModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  propriedadeId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string; // Ex: Safra 2021

  @HasMany(() => CulturaModel)
  culturas: CulturaModel[];
}
