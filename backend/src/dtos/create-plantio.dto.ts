import { IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';

export class CreatePlantioDto {
  @IsNotEmpty({ message: 'O ID da propriedade não pode estar vazio.' })
  @IsUUID('4', { message: 'O ID da propriedade deve ser um UUID válido.' })
  propriedadeId: string;

  @IsNotEmpty({ message: 'O ID da safra não pode estar vazio.' })
  @IsUUID('4', { message: 'O ID da safra deve ser um UUID válido.' })
  safraId: string;

  @IsNotEmpty({ message: 'O ID da cultura não pode estar vazio.' })
  @IsUUID('4', { message: 'O ID da cultura deve ser um UUID válido.' })
  culturaId: string;

  @IsNotEmpty({ message: 'A área plantada não pode estar vazia.' })
  @IsNumber({}, { message: 'A área plantada deve ser um número.' })
  @Min(0.01, { message: 'A área plantada deve ser maior que zero.' })
  areaPlantada: number;
}
