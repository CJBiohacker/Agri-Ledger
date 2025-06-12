import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PropriedadeModel } from '../models/propriedade.model';
import { CreatePropriedadeDto } from '../dtos/create-propriedade.dto';
import { UpdatePropriedadeDto } from '../dtos/update-propriedade.dto';

@Injectable()
export class PropriedadeService {
  constructor(
    @InjectModel(PropriedadeModel)
    private readonly propriedadeModel: typeof PropriedadeModel,
  ) {}

  async create(dto: CreatePropriedadeDto) {
    if (dto.areaAgricultavel + dto.areaVegetacao > dto.areaTotal) {
      throw new BadRequestException(
        'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total da fazenda.',
      );
    }
    return this.propriedadeModel.create(dto);
  }

  async findAll(produtorId?: number) {
    if (produtorId) {
      return this.propriedadeModel.findAll({ where: { produtorId } });
    }
    return this.propriedadeModel.findAll();
  }

  async findOne(id: number) {
    return this.propriedadeModel.findByPk(id);
  }

  async update(id: number, dto: UpdatePropriedadeDto) {
    const propriedade = await this.propriedadeModel.findByPk(id);
    if (!propriedade) return null;
    // Se algum campo de área for atualizado, validar a soma
    const areaTotal = dto.areaTotal ?? propriedade.areaTotal;
    const areaAgricultavel =
      dto.areaAgricultavel ?? propriedade.areaAgricultavel;
    const areaVegetacao = dto.areaVegetacao ?? propriedade.areaVegetacao;
    if (areaAgricultavel + areaVegetacao > areaTotal) {
      throw new BadRequestException(
        'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total da fazenda.',
      );
    }
    return propriedade.update(dto);
  }

  async remove(id: number) {
    const propriedade = await this.propriedadeModel.findByPk(id);
    if (!propriedade) return null;
    await propriedade.destroy();
    return { deleted: true };
  }
}
