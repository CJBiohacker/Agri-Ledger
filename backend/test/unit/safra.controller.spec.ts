import { Test, TestingModule } from '@nestjs/testing';
import { SafraController } from '../../src/controllers/safra.controller';
import { SafraService } from '../../src/services/safra.service';
import {
  mockSafra,
  mockSafraArray,
  mockCreateSafraDto,
  mockUpdateSafraDto,
} from '../mocks/safra.mock';

describe('SafraController', () => {
  let controller: SafraController;
  let service: SafraService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue(mockSafraArray),
    findOne: jest.fn().mockResolvedValue(mockSafra),
    create: jest.fn().mockResolvedValue({ id: 3, ...mockCreateSafraDto }),
    update: jest
      .fn()
      .mockResolvedValue({ ...mockSafra, ...mockUpdateSafraDto }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SafraController],
      providers: [{ provide: SafraService, useValue: mockService }],
    }).compile();
    controller = module.get<SafraController>(SafraController);
    service = module.get<SafraService>(SafraService);
  });

  it('deve retornar todas as safras', async () => {
    const result = await controller.findAll();
    expect(result).toEqual(mockSafraArray);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve retornar uma safra por id', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(mockSafra);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('deve criar uma safra', async () => {
    const result = await controller.create(mockCreateSafraDto);
    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(mockCreateSafraDto.nome);
    expect(service.create).toHaveBeenCalledWith(mockCreateSafraDto);
  });

  it('deve atualizar uma safra', async () => {
    const result = await controller.update(1, mockUpdateSafraDto);
    expect(result.nome).toBe(mockUpdateSafraDto.nome);
    expect(service.update).toHaveBeenCalledWith(1, mockUpdateSafraDto);
  });

  it('deve remover uma safra', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
