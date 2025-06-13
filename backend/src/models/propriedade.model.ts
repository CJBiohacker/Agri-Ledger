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

  @HasMany(() => PlantioModel)
  plantios: PlantioModel[];
}
