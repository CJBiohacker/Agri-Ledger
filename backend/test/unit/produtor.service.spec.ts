import { Test, TestingModule } from '@nestjs/testing';
import { ProdutorService } from '../../src/services/produtor.service';
import { getModelToken } from '@nestjs/sequelize';
import { ProdutorModel } from '../../src/models/produtor.model';
import {
  mockProdutorModel,
  mockProdutor,
  mockProdutorArray,
  mockCreateProdutorDto,
} from '../mocks/produtor.mock';

describe('ProdutorService', () => {
  let service: ProdutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutorService,
        {
          provide: getModelToken(ProdutorModel),
          useValue: mockProdutorModel,
        },
      ],
    }).compile();

    service = module.get<ProdutorService>(ProdutorService);
  });

  it('deve retornar todos os produtores', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockProdutorArray);
  });

  it('deve retornar um produtor por id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockProdutor);
  });

  it('deve criar um produtor', async () => {
    const result = await service.create(mockCreateProdutorDto);
    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(mockCreateProdutorDto.nome);
  });

  it('deve lançar erro ao criar produtor com CPF inválido', async () => {
    await expect(
      service.create({ nome: 'Teste', cpfCnpj: '123' }),
    ).rejects.toThrow('CPF ou CNPJ inválido');
  });
});
