import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCulturaDto {
  @IsNotEmpty({ message: 'O nome da cultura não pode estar vazio.' })
  @IsString({ message: 'O nome da cultura deve ser uma string.' })
  nome: string; // Ex: Soja, Milho, Café
}
