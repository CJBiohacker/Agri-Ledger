import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCulturaDto {
  @IsOptional()
  @IsNumber()
  safraId?: number;

  @IsOptional()
  @IsString()
  nome?: string;
}
