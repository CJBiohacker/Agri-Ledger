import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  cpfCnpj: string;

  @IsNotEmpty()
  @IsString()
  senha: string;
}
