import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateSafraDto {
  @IsOptional()
  @IsUUID('4', { message: 'O ID da propriedade deve ser um UUID válido.' })
  propriedadeId?: string;

  @IsOptional()
  @IsString({ message: 'O nome da safra deve ser uma string.' })
  nome?: string;

  @IsOptional()
  @IsDateString({}, { message: 'A data de início deve ser uma data válida.' })
  dataInicio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'A data de fim deve ser uma data válida.' })
  dataFim?: string;
}
