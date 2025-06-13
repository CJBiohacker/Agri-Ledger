import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SafraModel } from '../models/safra.model';
import { CreateSafraDto } from '../dtos/create-safra.dto';
import { UpdateSafraDto } from '../dtos/update-safra.dto';
import { PropriedadeModel } from '../models/propriedade.model';
import { PlantioModel } from '../models/plantio.model';
import { CulturaModel } from '../models/cultura.model';
import { Op } from 'sequelize';

@Injectable()
export class SafraService {
  constructor(
    @InjectModel(SafraModel)
    private readonly safraModel: typeof SafraModel,
    @InjectModel(PropriedadeModel)
    private readonly propriedadeModel: typeof PropriedadeModel,
  ) {}

  async create(createSafraDto: CreateSafraDto): Promise<SafraModel> {
    const propriedade = await this.propriedadeModel.findByPk(
      createSafraDto.propriedadeId,
    );
    if (!propriedade) {
      throw new NotFoundException(
        `Propriedade com ID ${createSafraDto.propriedadeId} não encontrada.`,
      );
    }

    const newStartDate = new Date(createSafraDto.dataInicio);
    const newEndDate = new Date(createSafraDto.dataFim);

    if (newStartDate >= newEndDate) {
      throw new BadRequestException(
        'A data de início não pode ser posterior ou igual à data de fim.',
      );
    }

    const existingSafras = await this.safraModel.findAll({
      where: {
        propriedadeId: createSafraDto.propriedadeId,
        [Op.or]: [
          { dataInicio: { [Op.between]: [newStartDate, newEndDate] } },
          { dataFim: { [Op.between]: [newStartDate, newEndDate] } },
          {
            [Op.and]: [
              { dataInicio: { [Op.lte]: newStartDate } },
              { dataFim: { [Op.gte]: newEndDate } },
            ],
          },
        ],
      },
    });

    if (existingSafras.length > 0) {
      throw new BadRequestException(
        `A propriedade já possui uma safra (${existingSafras[0].nome}) que conflita com o período de ${createSafraDto.dataInicio} a ${createSafraDto.dataFim}.`,
      );
    }

    return this.safraModel.create({
      nome: createSafraDto.nome,
      dataInicio: createSafraDto.dataInicio,
      dataFim: createSafraDto.dataFim,
      propriedadeId: createSafraDto.propriedadeId,
    });
  }

  async findAll(propriedadeId?: string): Promise<SafraModel[]> {
    const includeOptions = [
      { model: PropriedadeModel },
      { model: PlantioModel, include: [CulturaModel] },
    ];
    if (propriedadeId) {
      const propriedade = await this.propriedadeModel.findByPk(propriedadeId);
      if (!propriedade) {
        throw new NotFoundException(
          `Propriedade com ID ${propriedadeId} não encontrada.`,
        );
      }
      return this.safraModel.findAll({
        where: { propriedadeId },
        include: includeOptions,
      });
    }
    return this.safraModel.findAll({ include: includeOptions });
  }

  async findOne(id: string): Promise<SafraModel> {
    const safra = await this.safraModel.findByPk(id, {
      include: [
        { model: PropriedadeModel },
        { model: PlantioModel, include: [CulturaModel] },
      ],
    });
    if (!safra) {
      throw new NotFoundException(`Safra com ID ${id} não encontrada.`);
    }
    return safra;
  }

  async update(
    id: string,
    updateSafraDto: UpdateSafraDto,
  ): Promise<SafraModel> {
    const safra = await this.findOne(id);

    if (
      updateSafraDto.propriedadeId &&
      updateSafraDto.propriedadeId !== safra.propriedadeId
    ) {
      const propriedade = await this.propriedadeModel.findByPk(
        updateSafraDto.propriedadeId,
      );
      if (!propriedade) {
        throw new NotFoundException(
          `Propriedade com ID ${updateSafraDto.propriedadeId} não encontrada para atualização da safra.`,
        );
      }
    }

    if (updateSafraDto.dataInicio || updateSafraDto.dataFim) {
      const propriedadeIdParaValidacao =
        updateSafraDto.propriedadeId || safra.propriedadeId;
      const newStartDate = new Date(
        updateSafraDto.dataInicio || safra.dataInicio,
      );
      const newEndDate = new Date(updateSafraDto.dataFim || safra.dataFim);

      if (newStartDate >= newEndDate) {
        throw new BadRequestException(
          'A data de início não pode ser posterior ou igual à data de fim.',
        );
      }

      const existingSafras = await this.safraModel.findAll({
        where: {
          propriedadeId: propriedadeIdParaValidacao,
          id: { [Op.ne]: id },
          [Op.or]: [
            { dataInicio: { [Op.between]: [newStartDate, newEndDate] } },
            { dataFim: { [Op.between]: [newStartDate, newEndDate] } },
            {
              [Op.and]: [
                { dataInicio: { [Op.lte]: newStartDate } },
                { dataFim: { [Op.gte]: newEndDate } },
              ],
            },
          ],
        },
      });

      if (existingSafras.length > 0) {
        throw new BadRequestException(
          `A propriedade já possui outra safra (${existingSafras[0].nome}) que conflita com o período de ${newStartDate.toISOString().split('T')[0]} a ${newEndDate.toISOString().split('T')[0]}.`,
        );
      }
    }

    await safra.update(updateSafraDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const safra = await this.findOne(id);
    await safra.destroy();
  }
}
