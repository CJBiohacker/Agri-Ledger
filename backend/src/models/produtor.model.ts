import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  PrimaryKey,
  Default,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { PropriedadeModel } from './propriedade.model';

@Table({ tableName: 'produtores', timestamps: true })
export class ProdutorModel extends Model<ProdutorModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: 'cpfCnpj', // Alterado de 'cpfcnpj' para 'cpfCnpj' para corresponder à migration
  })
  cpfCnpj: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'nome',
  })
  nome: string;

  @HasMany(() => PropriedadeModel)
  propriedades: PropriedadeModel[];

  // Hooks Sequelize para validação e sanitização
  @BeforeCreate
  @BeforeUpdate
  static formatCpfCnpj(instance: ProdutorModel) {
    if (instance.cpfCnpj) {
      instance.cpfCnpj = instance.cpfCnpj.replace(/\\D/g, '');
    }
  }
}
