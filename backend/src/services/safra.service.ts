import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SafraModel } from '../models/safra.model';
import { CreateSafraDto } from '../dtos/create-safra.dto';
import { UpdateSafraDto } from '../dtos/update-safra.dto';

@Injectable()
export class SafraService {
  constructor(
    @InjectModel(SafraModel)
    private readonly safraModel: typeof SafraModel,
  ) {}

  async create(dto: CreateSafraDto) {
    return this.safraModel.create(dto);
  }

  async findAll(propriedadeId?: number) {
    if (propriedadeId) {
      return this.safraModel.findAll({ where: { propriedadeId } });
    }
    return this.safraModel.findAll();
  }

  async findOne(id: number) {
    return this.safraModel.findByPk(id);
  }

  async update(id: number, dto: UpdateSafraDto) {
    const safra = await this.safraModel.findByPk(id);
    if (!safra) return null;
    return safra.update(dto);
  }

  async remove(id: number) {
    const safra = await this.safraModel.findByPk(id);
    if (!safra) return null;
    await safra.destroy();
    return { deleted: true };
  }
}
