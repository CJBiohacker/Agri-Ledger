import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlantioModel } from '../models/plantio.model';
import { CreatePlantioDto } from '../dtos/create-plantio.dto';
import { UpdatePlantioDto } from '../dtos/update-plantio.dto';
import { PropriedadeModel } from '../models/propriedade.model';
import { SafraModel } from '../models/safra.model';
import { CulturaModel } from '../models/cultura.model';

@Injectable()
export class PlantioService {
  constructor(
    @InjectModel(PlantioModel)
    private plantioModel: typeof PlantioModel,
    @InjectModel(PropriedadeModel)
    private propriedadeModel: typeof PropriedadeModel,
    @InjectModel(SafraModel)
    private safraModel: typeof SafraModel,
    @InjectModel(CulturaModel)
    private culturaModel: typeof CulturaModel,
  ) {}

  async create(createPlantioDto: CreatePlantioDto): Promise<PlantioModel> {
    // Verificar se as entidades relacionadas existem
    const propriedade = await this.propriedadeModel.findByPk(
      createPlantioDto.propriedadeId,
    );
    if (!propriedade) {
      throw new NotFoundException(
        `Propriedade com ID ${createPlantioDto.propriedadeId} não encontrada.`,
      );
    }

    const safra = await this.safraModel.findByPk(createPlantioDto.safraId);
    if (!safra) {
      throw new NotFoundException(
        `Safra com ID ${createPlantioDto.safraId} não encontrada.`,
      );
    }
    // Validar se a safra pertence à propriedade
    if (safra.propriedadeId !== propriedade.id) {
      throw new BadRequestException(
        'A safra informada não pertence à propriedade especificada.',
      );
    }

    const cultura = await this.culturaModel.findByPk(
      createPlantioDto.culturaId,
    );
    if (!cultura) {
      throw new NotFoundException(
        `Cultura com ID ${createPlantioDto.culturaId} não encontrada.`,
      );
    }

    return this.plantioModel.create({
      propriedadeId: createPlantioDto.propriedadeId,
      safraId: createPlantioDto.safraId,
      culturaId: createPlantioDto.culturaId,
      areaPlantada: createPlantioDto.areaPlantada,
    });
  }

  async findAll(): Promise<PlantioModel[]> {
    return this.plantioModel.findAll({
      include: [PropriedadeModel, SafraModel, CulturaModel],
    });
  }

  async findOne(id: string): Promise<PlantioModel> {
    const plantio = await this.plantioModel.findByPk(id, {
      include: [PropriedadeModel, SafraModel, CulturaModel],
    });
    if (!plantio) {
      throw new NotFoundException(`Plantio com ID ${id} não encontrado.`);
    }
    return plantio;
  }

  async update(
    id: string,
    updatePlantioDto: UpdatePlantioDto,
  ): Promise<PlantioModel> {
    const plantio = await this.findOne(id);

    if (updatePlantioDto.propriedadeId) {
      const propriedade = await this.propriedadeModel.findByPk(
        updatePlantioDto.propriedadeId,
      );
      if (!propriedade) {
        throw new NotFoundException(
          `Propriedade com ID ${updatePlantioDto.propriedadeId} não encontrada para atualização.`,
        );
      }
    }

    if (updatePlantioDto.safraId) {
      const safra = await this.safraModel.findByPk(updatePlantioDto.safraId);
      if (!safra) {
        throw new NotFoundException(
          `Safra com ID ${updatePlantioDto.safraId} não encontrada para atualização.`,
        );
      }
      // Validar se a nova safra pertence à propriedade do plantio (ou à nova propriedade, se fornecida)
      const propriedadeIdAtual =
        updatePlantioDto.propriedadeId || plantio.propriedadeId;
      if (safra.propriedadeId !== propriedadeIdAtual) {
        throw new BadRequestException(
          'A nova safra informada não pertence à propriedade do plantio.',
        );
      }
    }

    if (updatePlantioDto.culturaId) {
      const cultura = await this.culturaModel.findByPk(
        updatePlantioDto.culturaId,
      );
      if (!cultura) {
        throw new NotFoundException(
          `Cultura com ID ${updatePlantioDto.culturaId} não encontrada para atualização.`,
        );
      }
    }

    await plantio.update(updatePlantioDto);
    return this.findOne(id); // Retorna o plantio atualizado com as inclusões
  }

  async remove(id: string): Promise<void> {
    const plantio = await this.findOne(id);
    await plantio.destroy();
  }
}
