import {
  IsOptional,
  IsString,
  MinLength,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class UpdateProdutorDto {
  @IsOptional()
  @IsString()
  cpfCnpj?: string;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  @MinLength(6) // Exemplo de regra de tamanho mínimo para senha
  senha?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  papeis?: string[];
}
