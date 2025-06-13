import { Test, TestingModule } from '@nestjs/testing';
import { PropriedadeService } from '../../src/services/propriedade.service';
import { getModelToken } from '@nestjs/sequelize';
import { PropriedadeModel } from '../../src/models/propriedade.model';
import {
  mockPropriedadeModel,
  mockPropriedade,
  mockPropriedadeArray,
  mockCreatePropriedadeDto,
} from '../mocks/propriedade.mock';

describe('PropriedadeService', () => {
  let service: PropriedadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropriedadeService,
        {
          provide: getModelToken(PropriedadeModel),
          useValue: mockPropriedadeModel,
        },
      ],
    }).compile();

    service = module.get<PropriedadeService>(PropriedadeService);
  });

  it('deve retornar todas as propriedades', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockPropriedadeArray);
  });

  it('deve retornar uma propriedade por id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockPropriedade);
  });

  it('deve criar uma propriedade', async () => {
    const result = await service.create(mockCreatePropriedadeDto);
    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(mockCreatePropriedadeDto.nome);
  });
});
