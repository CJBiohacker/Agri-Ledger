import { Test, TestingModule } from '@nestjs/testing';
import { CulturaService } from '../../src/services/cultura.service';
import { getModelToken } from '@nestjs/sequelize';
import { CulturaModel } from '../../src/models/cultura.model';
import {
  mockCulturaModel,
  mockCultura,
  mockCulturaArray,
  mockCreateCulturaDto,
} from '../mocks/cultura.mock';

describe('CulturaService', () => {
  let service: CulturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CulturaService,
        {
          provide: getModelToken(CulturaModel),
          useValue: mockCulturaModel,
        },
      ],
    }).compile();

    service = module.get<CulturaService>(CulturaService);
  });

  it('deve retornar todas as culturas', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockCulturaArray);
  });

  it('deve retornar uma cultura por id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockCultura);
  });

  it('deve criar uma cultura', async () => {
    const result = await service.create(mockCreateCulturaDto);
    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(mockCreateCulturaDto.nome);
  });
});
