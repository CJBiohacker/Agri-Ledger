import { IsOptional, IsUUID, IsNumber, Min } from 'class-validator';

export class UpdatePlantioDto {
  @IsOptional()
  @IsUUID('4', { message: 'O ID da propriedade deve ser um UUID válido.' })
  propriedadeId?: string;

  @IsOptional()
  @IsUUID('4', { message: 'O ID da safra deve ser um UUID válido.' })
  safraId?: string;

  @IsOptional()
  @IsUUID('4', { message: 'O ID da cultura deve ser um UUID válido.' })
  culturaId?: string;

  @IsOptional()
  @IsNumber({}, { message: 'A área plantada deve ser um número.' })
  @Min(0.01, { message: 'A área plantada deve ser maior que zero.' })
  areaPlantada?: number;
}
