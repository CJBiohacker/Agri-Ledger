import { IsOptional, IsString } from 'class-validator';

export class UpdateProdutorDto {
  @IsOptional()
  @IsString()
  cpfCnpj?: string;

  @IsOptional()
  @IsString()
  nome?: string;
}
