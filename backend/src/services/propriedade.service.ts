import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PropriedadeModel } from '../models/propriedade.model';
import { CreatePropriedadeDto } from '../dtos/create-propriedade.dto';
import { UpdatePropriedadeDto } from '../dtos/update-propriedade.dto';
import { ProdutorModel } from '../models/produtor.model'; // Adicionado
import { SafraModel } from '../models/safra.model'; // Adicionado
import { PlantioModel } from '../models/plantio.model'; // Adicionado
import { CulturaModel } from '../models/cultura.model'; // Adicionado

@Injectable()
export class PropriedadeService {
  constructor(
    @InjectModel(PropriedadeModel)
    private readonly propriedadeModel: typeof PropriedadeModel,
  ) {}

  async create(dto: CreatePropriedadeDto) {
    // Validação de produtorId (UUID) pode ser adicionada aqui se necessário,
    // por exemplo, verificando se o ProdutorModel com dto.produtorId existe.
    // No entanto, o class-validator no DTO já deve garantir que é um UUID.
    if (dto.areaAgricultavel + dto.areaVegetacao > dto.areaTotal) {
      throw new BadRequestException(
        'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total da fazenda.',
      );
    }
    return this.propriedadeModel.create(dto);
  }

  async findAll(produtorId?: string) {
    // Alterado para produtorId?: string (UUID)
    const includeOptions = [
      ProdutorModel, // Inclui dados do produtor
      {
        model: SafraModel, // Inclui safras da propriedade
        include: [
          {
            model: PlantioModel, // Inclui plantios de cada safra
            include: [CulturaModel], // Inclui dados da cultura em cada plantio
          },
        ],
      },
      // Incluir PlantioModel diretamente em PropriedadeModel se houver plantios não associados a safras específicas
      // ou se a relação direta Propriedade -> Plantio for relevante para todas as propriedades buscadas.
      // Por ora, vamos focar nos plantios via SafraModel.
      // { model: PlantioModel, include: [CulturaModel] }
    ];

    if (produtorId) {
      return this.propriedadeModel.findAll({
        where: { produtorId },
        include: includeOptions,
      });
    }
    return this.propriedadeModel.findAll({ include: includeOptions });
  }

  async findOne(id: string) {
    // Alterado para id: string (UUID)
    return this.propriedadeModel.findByPk(id, {
      include: [
        ProdutorModel,
        {
          model: SafraModel,
          include: [
            {
              model: PlantioModel,
              include: [CulturaModel],
            },
          ],
        },
        // { model: PlantioModel, include: [CulturaModel] } // Mesma observação do findAll
      ],
    });
  }

  async update(id: string, dto: UpdatePropriedadeDto) {
    // Alterado para id: string (UUID)
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

  async remove(id: string) {
    // Alterado para id: string (UUID)
    const propriedade = await this.propriedadeModel.findByPk(id);
    if (!propriedade) return null;
    await propriedade.destroy();
    return { deleted: true };
  }
}
