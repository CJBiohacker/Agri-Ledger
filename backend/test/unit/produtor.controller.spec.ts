import { Test, TestingModule } from '@nestjs/testing';
import { ProdutorController } from '../../src/controllers/produtor.controller';
import { ProdutorService } from '../../src/services/produtor.service';
import {
  mockProdutor,
  mockProdutorArray,
  mockCreateProdutorDto,
  mockUpdateProdutorDto,
} from '../mocks/produtor.mock';

describe('ProdutorController', () => {
  let controller: ProdutorController;
  let service: ProdutorService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue(mockProdutorArray),
    findOne: jest.fn().mockResolvedValue(mockProdutor),
    create: jest.fn().mockResolvedValue({ id: 3, ...mockCreateProdutorDto }),
    update: jest
      .fn()
      .mockResolvedValue({ ...mockProdutor, ...mockUpdateProdutorDto }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutorController],
      providers: [{ provide: ProdutorService, useValue: mockService }],
    }).compile();
    controller = module.get<ProdutorController>(ProdutorController);
    service = module.get<ProdutorService>(ProdutorService);
  });

  it('deve retornar todos os produtores', async () => {
    const result = await controller.findAll();
    expect(result).toEqual(mockProdutorArray);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve retornar um produtor por id', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(mockProdutor);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('deve criar um produtor', async () => {
    const result = await controller.create(mockCreateProdutorDto);
    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(mockCreateProdutorDto.nome);
    expect(service.create).toHaveBeenCalledWith(mockCreateProdutorDto);
  });

  it('deve atualizar um produtor', async () => {
    const result = await controller.update(1, mockUpdateProdutorDto);
    expect(result.nome).toBe(mockUpdateProdutorDto.nome);
    expect(service.update).toHaveBeenCalledWith(1, mockUpdateProdutorDto);
  });

  it('deve remover um produtor', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
