import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProdutorDto {
  @IsNotEmpty()
  @IsString()
  cpfCnpj: string;

  @IsNotEmpty()
  @IsString()
  nome: string;
}
