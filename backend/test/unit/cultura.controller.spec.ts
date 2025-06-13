import { Test, TestingModule } from '@nestjs/testing';
import { CulturaController } from '../../src/controllers/cultura.controller';
import { CulturaService } from '../../src/services/cultura.service';
import {
  mockCultura,
  mockCulturaArray,
  mockCreateCulturaDto,
  mockUpdateCulturaDto,
} from '../mocks/cultura.mock';

describe('CulturaController', () => {
  let controller: CulturaController;
  let service: CulturaService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue(mockCulturaArray),
    findOne: jest.fn().mockResolvedValue(mockCultura),
    create: jest.fn().mockResolvedValue({ id: 3, ...mockCreateCulturaDto }),
    update: jest
      .fn()
      .mockResolvedValue({ ...mockCultura, ...mockUpdateCulturaDto }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CulturaController],
      providers: [{ provide: CulturaService, useValue: mockService }],
    }).compile();
    controller = module.get<CulturaController>(CulturaController);
    service = module.get<CulturaService>(CulturaService);
  });

  it('deve retornar todas as culturas', async () => {
    const result = await controller.findAll();
    expect(result).toEqual(mockCulturaArray);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve retornar uma cultura por id', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(mockCultura);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('deve criar uma cultura', async () => {
    const result = await controller.create(mockCreateCulturaDto);
    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(mockCreateCulturaDto.nome);
    expect(service.create).toHaveBeenCalledWith(mockCreateCulturaDto);
  });

  it('deve atualizar uma cultura', async () => {
    const result = await controller.update(1, mockUpdateCulturaDto);
    expect(result.nome).toBe(mockUpdateCulturaDto.nome);
    expect(service.update).toHaveBeenCalledWith(1, mockUpdateCulturaDto);
  });

  it('deve remover uma cultura', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
