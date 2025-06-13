import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  HasMany, // Será usado para o modelo de junção PlantioModel
} from 'sequelize-typescript';
import { PropriedadeModel } from './propriedade.model';
import { PlantioModel } from './plantio.model'; // Será criado

@Table({ tableName: 'safras', timestamps: true })
export class SafraModel extends Model<SafraModel> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'nome', // Ex: Safra Verão 2023/2024, Colheita Principal 2024
  })
  nome: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'data_inicio',
  })
  dataInicio: string; // Formato YYYY-MM-DD

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'data_fim',
  })
  dataFim: string; // Formato YYYY-MM-DD

  // Relação com a tabela de junção PlantioModel
  @HasMany(() => PlantioModel)
  plantios: PlantioModel[];

  // Timestamps padrão do Sequelize (createdAt e updatedAt) são gerenciados automaticamente
}
