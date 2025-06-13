import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProdutorService } from '../services/produtor.service';
import * as bcrypt from 'bcrypt';
import { ProdutorModel } from '../models/produtor.model';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly produtorService: ProdutorService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(cpfCnpj: string, pass: string): Promise<any> {
    this.logger.debug(`[validateUser] Tentando validar usuário: ${cpfCnpj}`);
    const user = await this.produtorService.findByCpfCnpj(cpfCnpj);

    if (!user) {
      this.logger.warn(`[validateUser] Usuário não encontrado: ${cpfCnpj}`);
      return null;
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.senha);

    if (isPasswordMatching) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...result } = user.get({ plain: true });
      this.logger.debug(
        `[validateUser] Validação bem-sucedida para: ${cpfCnpj}`,
      );
      return result;
    }

    this.logger.warn(
      `[validateUser] Falha na validação (senha não corresponde) para: ${cpfCnpj}`,
    );
    return null;
  }

  async login(user: ProdutorModel) {
    const payload = {
      cpfCnpj: user.cpfCnpj, // Alterado de username para cpfCnpj
      sub: user.id,
      papeis: user.papeis,
    };
    this.logger.log(
      `[login] Gerando token JWT para usuário: ${user.cpfCnpj}, ID: ${user.id}`,
    );
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
