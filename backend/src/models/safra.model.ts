import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { PropriedadeModel } from './propriedade.model';
import { CulturaModel } from './cultura.model';

@Table({ tableName: 'safras', timestamps: true })
export class SafraModel extends Model<SafraModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  })
  id: number;

  @ForeignKey(() => PropriedadeModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'propriedadeid',
  })
  propriedadeId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'nome',
  })
  nome: string; // Ex: Safra 2021

  @HasMany(() => CulturaModel)
  culturas: CulturaModel[];

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
