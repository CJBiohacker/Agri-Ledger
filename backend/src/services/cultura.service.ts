import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CulturaModel } from '../models/cultura.model';
import { CreateCulturaDto } from '../dtos/create-cultura.dto';
import { UpdateCulturaDto } from '../dtos/update-cultura.dto';
import { PlantioModel } from '../models/plantio.model';
import { Op } from 'sequelize'; // Importar Op diretamente de 'sequelize'

@Injectable()
export class CulturaService {
  constructor(
    @InjectModel(CulturaModel)
    private readonly culturaModel: typeof CulturaModel,
    // Não vamos injetar Sequelize aqui por enquanto, Op deve ser suficiente
  ) {}

  async create(createCulturaDto: CreateCulturaDto): Promise<CulturaModel> {
    const existingCultura = await this.culturaModel.findOne({
      where: {
        nome: {
          [Op.iLike]: createCulturaDto.nome, // Usar Op.iLike para case-insensitive
        },
      },
    });

    if (existingCultura) {
      throw new ConflictException(
        `Cultura com nome "${createCulturaDto.nome}" já existe.`,
      );
    }
    return this.culturaModel.create(createCulturaDto);
  }

  async findAll(): Promise<CulturaModel[]> {
    return this.culturaModel.findAll({
      include: [{ model: PlantioModel, attributes: ['id', 'areaPlantada'] }],
    });
  }

  async findOne(id: string): Promise<CulturaModel> {
    const cultura = await this.culturaModel.findByPk(id, {
      include: [{ model: PlantioModel }],
    });
    if (!cultura) {
      throw new NotFoundException(`Cultura com ID ${id} não encontrada.`);
    }
    return cultura;
  }

  async update(
    id: string,
    updateCulturaDto: UpdateCulturaDto,
  ): Promise<CulturaModel> {
    const cultura = await this.findOne(id);

    if (updateCulturaDto.nome) {
      const existingCultura = await this.culturaModel.findOne({
        where: {
          id: { [Op.ne]: id },
          nome: {
            [Op.iLike]: updateCulturaDto.nome, // Usar Op.iLike
          },
        },
      });

      if (existingCultura) {
        throw new ConflictException(
          `Outra cultura com nome "${updateCulturaDto.nome}" já existe.`,
        );
      }
    }

    await cultura.update(updateCulturaDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const cultura = await this.findOne(id);
    try {
      await cultura.destroy();
    } catch (error) {
      // SequelizeForeignKeyConstraintError é o nome padrão para erros de FK
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new ConflictException(
          `Cultura com ID ${id} não pode ser removida pois está sendo utilizada em um ou mais plantios.`,
        );
      }
      throw error; // Relança outros erros
    }
  }
}
