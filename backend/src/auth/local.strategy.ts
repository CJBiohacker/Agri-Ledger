import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'cpfCnpj', passwordField: 'senha' });
    this.logger.verbose('LocalStrategy instanciada'); // Alterado de log para verbose
  }

  async validate(cpfCnpj: string, pass: string): Promise<any> {
    this.logger.debug(`Tentativa de validação para cpfCnpj: ${cpfCnpj}`); // Alterado de log para debug
    const user = await this.authService.validateUser(cpfCnpj, pass);
    if (!user) {
      this.logger.warn(
        `Falha na validação para cpfCnpj: ${cpfCnpj} - Usuário não encontrado ou senha inválida`,
      );
      throw new UnauthorizedException('Credenciais inválidas');
    }
    this.logger.debug(`Usuário validado com sucesso: ${user.cpfCnpj}`); // Alterado de log para debug
    return user; // Retorna o objeto do usuário completo, que será anexado a request.user
  }
}
