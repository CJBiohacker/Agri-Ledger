import { IsNotEmpty, IsString, IsDateString, IsUUID } from 'class-validator';

export class CreateSafraDto {
  @IsNotEmpty({ message: 'O ID da propriedade não pode estar vazio.' })
  @IsUUID('4', { message: 'O ID da propriedade deve ser um UUID válido.' })
  propriedadeId: string;

  @IsNotEmpty({ message: 'O nome da safra não pode estar vazio.' })
  @IsString({ message: 'O nome da safra deve ser uma string.' })
  nome: string; // Ex: Safra Soja 2023/2024

  @IsNotEmpty({ message: 'A data de início não pode estar vazia.' })
  @IsDateString({}, { message: 'A data de início deve ser uma data válida.' })
  dataInicio: string;

  @IsNotEmpty({ message: 'A data de fim não pode estar vazia.' })
  @IsDateString({}, { message: 'A data de fim deve ser uma data válida.' })
  dataFim: string;
}
