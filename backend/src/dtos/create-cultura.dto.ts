import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCulturaDto {
  @IsNotEmpty()
  @IsNumber()
  safraId: number;

  @IsNotEmpty()
  @IsString()
  nome: string; // Ex: Soja, Milho, Café
}
