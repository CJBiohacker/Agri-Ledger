import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ProdutorModel } from './produtor.model';
import { SafraModel } from './safra.model';
import { PlantioModel } from './plantio.model';

@Table({ tableName: 'propriedades', timestamps: true })
export class PropriedadeModel extends Model<PropriedadeModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => ProdutorModel)
  @Column({ type: DataType.UUID, allowNull: false })
  produtorId: string;

  @BelongsTo(() => ProdutorModel)
  produtor: ProdutorModel;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'nome',
  })
  nome: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'cidade', // Mantido para clareza, corresponde ao nome da propriedade
  })
  cidade: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'estado', // Mantido para clareza, corresponde ao nome da propriedade
  })
  estado: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: 'areaTotal', // CORRIGIDO de 'areatotal' para 'areaTotal'
  })
  areaTotal: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: 'areaAgricultavel', // CORRIGIDO de 'areaagricultavel' para 'areaAgricultavel'
  })
  areaAgricultavel: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: 'areaVegetacao', // CORRIGIDO de 'areavegetacao' para 'areaVegetacao'
  })
  areaVegetacao: number;

  @HasMany(() => SafraModel)
  safras: SafraModel[];

  @HasMany(() => PlantioModel)
  plantios: PlantioModel[];
}
