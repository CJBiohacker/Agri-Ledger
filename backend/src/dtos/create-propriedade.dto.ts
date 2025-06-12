import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePropriedadeDto {
  @IsNotEmpty()
  @IsNumber()
  produtorId: number;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cidade: string;

  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsNotEmpty()
  @IsNumber()
  areaTotal: number;

  @IsNotEmpty()
  @IsNumber()
  areaAgricultavel: number;

  @IsNotEmpty()
  @IsNumber()
  areaVegetacao: number;
}
