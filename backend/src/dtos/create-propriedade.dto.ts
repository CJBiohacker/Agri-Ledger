import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePropriedadeDto {
  @IsNotEmpty()
  @IsUUID()
  produtorId: string;

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
