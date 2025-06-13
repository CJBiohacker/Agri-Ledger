import { validateSync } from 'class-validator';
import { CreateProdutorDto } from '../../src/dtos/create-produtor.dto';
import { CreatePropriedadeDto } from '../../src/dtos/create-propriedade.dto';

// Testes de validação dos DTOs

describe('DTO Validation', () => {
  it('deve validar CreateProdutorDto válido', () => {
    const dto = new CreateProdutorDto();
    dto.nome = 'João';
    dto.cpfCnpj = '52998224725';
    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('deve invalidar CreateProdutorDto sem nome', () => {
    const dto = new CreateProdutorDto();
    dto.cpfCnpj = '52998224725';
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve validar CreatePropriedadeDto válido', () => {
    const dto = new CreatePropriedadeDto();
    dto.nome = 'Fazenda';
    dto.cidade = 'Uberlândia';
    dto.estado = 'MG';
    dto.areaTotal = 100;
    dto.areaAgricultavel = 60;
    dto.areaVegetacao = 40;
    dto.produtorId = 1;
    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('deve invalidar CreatePropriedadeDto sem areaTotal', () => {
    const dto = new CreatePropriedadeDto();
    dto.nome = 'Fazenda';
    dto.cidade = 'Uberlândia';
    dto.estado = 'MG';
    dto.areaAgricultavel = 60;
    dto.areaVegetacao = 40;
    dto.produtorId = 1;
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
