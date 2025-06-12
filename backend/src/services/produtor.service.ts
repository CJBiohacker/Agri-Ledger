import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProdutorModel } from '../models/produtor.model';
import { CreateProdutorDto } from '../dtos/create-produtor.dto';
import { UpdateProdutorDto } from '../dtos/update-produtor.dto';
import { isValidCPF, isValidCNPJ } from '../utils';

@Injectable()
export class ProdutorService {
  constructor(
    @InjectModel(ProdutorModel)
    private readonly produtorModel: typeof ProdutorModel,
  ) {}

  async create(dto: CreateProdutorDto) {
    if (!isValidCPF(dto.cpfCnpj) && !isValidCNPJ(dto.cpfCnpj)) {
      throw new BadRequestException('CPF ou CNPJ inválido');
    }
    return this.produtorModel.create(dto);
  }

  async findAll() {
    return this.produtorModel.findAll();
  }

  async findOne(id: number) {
    return this.produtorModel.findByPk(id);
  }

  async update(id: number, dto: UpdateProdutorDto) {
    if (dto.cpfCnpj && !isValidCPF(dto.cpfCnpj) && !isValidCNPJ(dto.cpfCnpj)) {
      throw new BadRequestException('CPF ou CNPJ inválido');
    }
    const produtor = await this.produtorModel.findByPk(id);
    if (!produtor) return null;
    return produtor.update(dto);
  }

  async remove(id: number) {
    const produtor = await this.produtorModel.findByPk(id);
    if (!produtor) return null;
    await produtor.destroy();
    return { deleted: true };
  }
}
