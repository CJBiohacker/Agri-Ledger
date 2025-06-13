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
    type: DataType.UUID, // Alterado de INTEGER para UUID
    defaultValue: DataType.UUIDV4, // Adicionado para gerar UUID automaticamente
    primaryKey: true,
    field: 'id',
  })
  id: string; // Alterado de number para string

  @ForeignKey(() => PropriedadeModel)
  @Column({
    type: DataType.UUID, // Alterado de INTEGER para UUID
    allowNull: false,
    field: 'propriedadeid',
  })
  propriedadeId: string; // Alterado de number para string

  @BelongsTo(() => PropriedadeModel)
  propriedade: PropriedadeModel;

  @ForeignKey(() => SafraModel)
  @Column({
    type: DataType.UUID, // Alterado de INTEGER para UUID
    allowNull: false,
    field: 'safraid',
  })
  safraId: string; // Alterado de number para string

  @BelongsTo(() => SafraModel)
  safra: SafraModel;

  @ForeignKey(() => CulturaModel)
  @Column({
    type: DataType.UUID, // Alterado de INTEGER para UUID
    allowNull: false,
    field: 'culturaid',
  })
  culturaId: string; // Alterado de number para string

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: 'area_plantada',
  })
  areaPlantada: number; // Em hectares

  // Timestamps createdAt e updatedAt são gerenciados automaticamente
}
