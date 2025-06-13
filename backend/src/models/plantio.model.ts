import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { PropriedadeModel } from './propriedade.model';
import { SafraModel } from './safra.model';
import { CulturaModel } from './cultura.model';

@Table({ tableName: 'plantios', timestamps: true })
export class PlantioModel extends Model<PlantioModel> {
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

  @BelongsTo(() => PropriedadeModel)
  propriedade: PropriedadeModel;

  @ForeignKey(() => SafraModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'safraid',
  })
  safraId: number;

  @BelongsTo(() => SafraModel)
  safra: SafraModel;

  @ForeignKey(() => CulturaModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'culturaid',
  })
  culturaId: number;

  @BelongsTo(() => CulturaModel)
  cultura: CulturaModel;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: 'area_plantada',
  })
  areaPlantada: number; // Em hectares

  // Timestamps createdAt e updatedAt são gerenciados automaticamente
}
