import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePropriedadeDto {
  @IsOptional()
  @IsNumber()
  produtorId?: number;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsNumber()
  areaTotal?: number;

  @IsOptional()
  @IsNumber()
  areaAgricultavel?: number;

  @IsOptional()
  @IsNumber()
  areaVegetacao?: number;
}
