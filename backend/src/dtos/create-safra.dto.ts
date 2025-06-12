import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSafraDto {
  @IsNotEmpty()
  @IsNumber()
  propriedadeId: number;

  @IsNotEmpty()
  @IsString()
  nome: string; // Ex: Safra 2021
}
