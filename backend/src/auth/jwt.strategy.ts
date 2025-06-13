import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      this.logger.error(
        'FATAL: Segredo JWT (JWT_SECRET) não encontrado nas variáveis de ambiente!',
      );
      // Em um cenário real, você poderia querer lançar um erro aqui para impedir a inicialização
      // throw new Error('Segredo JWT não configurado');
    }
    // Log de sucesso removido
  }

  async validate(payload: any) {
    // this.logger.debug(`Validando payload JWT: ${JSON.stringify(payload)}`); // Log de payload pode ser verboso
    // O payload deve conter id (sub), cpfCnpj e papeis, conforme definido em AuthService.login
    if (!payload.sub || !payload.cpfCnpj || !payload.papeis) {
      this.logger.warn('Payload JWT inválido ou faltando campos essenciais');
      throw new UnauthorizedException('Token inválido ou malformado');
    }
    // A validação de existência do usuário (findById) foi movida para o RolesGuard ou para um guard mais específico
    // se necessário, para desacoplar a JwtStrategy da ProdutorService e evitar chamadas de DB em cada request.
    // A JwtStrategy agora foca em validar a assinatura e expiração do token e extrair o payload.
    return {
      id: payload.sub,
      cpfCnpj: payload.cpfCnpj,
      papeis: payload.papeis,
    };
  }
}
