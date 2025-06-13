import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsArray,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';

export class CreateProdutorDto {
  @IsNotEmpty()
  @IsString()
  cpfCnpj: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  senha: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  papeis?: string[];
}
