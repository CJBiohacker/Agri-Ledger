import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CulturaModel } from '../models/cultura.model';
import { CreateCulturaDto } from '../dtos/create-cultura.dto';
import { UpdateCulturaDto } from '../dtos/update-cultura.dto';

@Injectable()
export class CulturaService {
  constructor(
    @InjectModel(CulturaModel)
    private readonly culturaModel: typeof CulturaModel,
  ) {}

  async create(dto: CreateCulturaDto) {
    return this.culturaModel.create(dto);
  }

  async findAll(safraId?: number) {
    if (safraId) {
      return this.culturaModel.findAll({ where: { safraId } });
    }
    return this.culturaModel.findAll();
  }

  async findOne(id: number) {
    return this.culturaModel.findByPk(id);
  }

  async update(id: number, dto: UpdateCulturaDto) {
    const cultura = await this.culturaModel.findByPk(id);
    if (!cultura) return null;
    return cultura.update(dto);
  }

  async remove(id: number) {
    const cultura = await this.culturaModel.findByPk(id);
    if (!cultura) return null;
    await cultura.destroy();
    return { deleted: true };
  }
}
