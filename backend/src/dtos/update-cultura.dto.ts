import { IsOptional, IsString } from 'class-validator';

export class UpdateCulturaDto {
  @IsOptional()
  @IsString({ message: 'O nome da cultura deve ser uma string.' })
  nome?: string;
}
