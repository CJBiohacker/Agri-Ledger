import { Test, TestingModule } from '@nestjs/testing';
import { PropriedadeController } from '../../src/controllers/propriedade.controller';
import { PropriedadeService } from '../../src/services/propriedade.service';
import {
  mockPropriedade,
  mockPropriedadeArray,
  mockCreatePropriedadeDto,
  mockUpdatePropriedadeDto,
} from '../mocks/propriedade.mock';

describe('PropriedadeController', () => {
  let controller: PropriedadeController;
  let service: PropriedadeService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue(mockPropriedadeArray),
    findOne: jest.fn().mockResolvedValue(mockPropriedade),
    create: jest.fn().mockResolvedValue({ id: 3, ...mockCreatePropriedadeDto }),
    update: jest
      .fn()
      .mockResolvedValue({ ...mockPropriedade, ...mockUpdatePropriedadeDto }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropriedadeController],
      providers: [{ provide: PropriedadeService, useValue: mockService }],
    }).compile();
    controller = module.get<PropriedadeController>(PropriedadeController);
    service = module.get<PropriedadeService>(PropriedadeService);
  });

  it('deve retornar todas as propriedades', async () => {
    const result = await controller.findAll();
    expect(result).toEqual(mockPropriedadeArray);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve retornar uma propriedade por id', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(mockPropriedade);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('deve criar uma propriedade', async () => {
    const result = await controller.create(mockCreatePropriedadeDto);
    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(mockCreatePropriedadeDto.nome);
    expect(service.create).toHaveBeenCalledWith(mockCreatePropriedadeDto);
  });

  it('deve atualizar uma propriedade', async () => {
    const result = await controller.update(1, mockUpdatePropriedadeDto);
    expect(result.nome).toBe(mockUpdatePropriedadeDto.nome);
    expect(service.update).toHaveBeenCalledWith(1, mockUpdatePropriedadeDto);
  });

  it('deve remover uma propriedade', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
