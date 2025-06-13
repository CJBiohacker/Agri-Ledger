import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePropriedadeDto {
  @IsOptional()
  @IsUUID()
  produtorId?: string;

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
