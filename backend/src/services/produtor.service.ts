import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProdutorModel } from '../models/produtor.model';
import { CreateProdutorDto } from '../dtos/create-produtor.dto';
import { UpdateProdutorDto } from '../dtos/update-produtor.dto';
import { isValidCPF, isValidCNPJ } from '../utils';
import { PropriedadeModel } from '../models/propriedade.model';

@Injectable()
export class ProdutorService {
  private readonly logger = new Logger(ProdutorService.name);

  constructor(
    @InjectModel(ProdutorModel)
    private readonly produtorModel: typeof ProdutorModel,
  ) {}

  async findByCpfCnpj(cpfCnpj: string): Promise<ProdutorModel | null> {
    return this.produtorModel.findOne({
      where: { cpfCnpj },
    });
  }

  async create(dto: CreateProdutorDto) {
    if (!isValidCPF(dto.cpfCnpj) && !isValidCNPJ(dto.cpfCnpj)) {
      throw new BadRequestException('CPF ou CNPJ inválido');
    }
    return this.produtorModel.create(dto);
  }

  async findAll() {
    try {
      const produtores = await this.produtorModel.findAll({
        include: [PropriedadeModel],
      });
      return produtores;
    } catch (error) {
      this.logger.error('Erro em ProdutorService.findAll', error.stack);
      throw error;
    }
  }

  async findOne(id: string) {
    return this.produtorModel.findByPk(id, {
      include: [PropriedadeModel],
    });
  }

  async update(id: string, dto: UpdateProdutorDto) {
    if (dto.cpfCnpj && !isValidCPF(dto.cpfCnpj) && !isValidCNPJ(dto.cpfCnpj)) {
      throw new BadRequestException('CPF ou CNPJ inválido');
    }
    const produtor = await this.produtorModel.findByPk(id);
    if (!produtor) return null;
    return produtor.update(dto);
  }

  async remove(id: string) {
    const produtor = await this.produtorModel.findByPk(id);
    if (!produtor) return null;
    await produtor.destroy();
    return { deleted: true };
  }

  async findById(id: string): Promise<ProdutorModel | null> {
    return this.produtorModel.findByPk(id);
  }
}
