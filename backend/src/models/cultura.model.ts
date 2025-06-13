import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { PlantioModel } from './plantio.model';

@Table({ tableName: 'culturas', timestamps: true })
export class CulturaModel extends Model<CulturaModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Nome da cultura deve ser único (Soja, Milho, etc.)
    field: 'nome',
  })
  nome: string; // Ex: Soja, Milho, Café

  // Relação com a tabela de junção PlantioModel
  @HasMany(() => PlantioModel)
  plantios: PlantioModel[];

  // Timestamps padrão do Sequelize (createdAt e updatedAt) são gerenciados automaticamente
}
