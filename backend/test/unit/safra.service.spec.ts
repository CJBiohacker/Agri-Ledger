import { Test, TestingModule } from '@nestjs/testing';
import { SafraService } from '../../src/services/safra.service';
import { getModelToken } from '@nestjs/sequelize';
import { SafraModel } from '../../src/models/safra.model';
import {
  mockSafraModel,
  mockSafra,
  mockSafraArray,
  mockCreateSafraDto,
} from '../mocks/safra.mock';

describe('SafraService', () => {
  let service: SafraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SafraService,
        {
          provide: getModelToken(SafraModel),
          useValue: mockSafraModel,
        },
      ],
    }).compile();

    service = module.get<SafraService>(SafraService);
  });

  it('deve retornar todas as safras', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockSafraArray);
  });

  it('deve retornar uma safra por id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockSafra);
  });

  it('deve criar uma safra', async () => {
    const result = await service.create(mockCreateSafraDto);
    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(mockCreateSafraDto.nome);
  });
});
