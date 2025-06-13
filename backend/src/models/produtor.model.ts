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
import * as bcrypt from 'bcrypt';

@Table({
  tableName: 'produtores', // Alterado para minúsculas
  timestamps: true,
})
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  senha!: string; // Adicionado "!" para indicar que será inicializado pelos hooks ou na criação

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: ['generico'], // Papel padrão
  })
  papeis: string[];

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

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: ProdutorModel) {
    if (instance.changed('senha') || instance.isNewRecord) {
      if (instance.senha) {
        const saltRounds = 10;
        instance.senha = await bcrypt.hash(instance.senha, saltRounds);
      }
    }
  }
}
