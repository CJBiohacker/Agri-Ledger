import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSafraDto {
  @IsOptional()
  @IsNumber()
  propriedadeId?: number;

  @IsOptional()
  @IsString()
  nome?: string;
}
