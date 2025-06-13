import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (!user?.papeis) {
      this.logger.warn(
        'Usuário não autenticado ou sem papéis no token para RolesGuard.',
      );
      return false;
    }

    // Opcional: Se precisar validar se o usuário do token ainda existe no banco ou está ativo.
    // Descomente e ajuste o ProdutorService se esta validação for necessária aqui.
    // import { ProdutorService } from '../../services/produtor.service'; // Necessário se descomentar abaixo
    // constructor(private readonly reflector: Reflector, private readonly produtorService: ProdutorService) {}
    // const userExists = await this.produtorService.findById(user.id);
    // if (!userExists) {
    //   this.logger.warn(`Usuário com ID ${user.id} do token não encontrado no banco.`);
    //   return false;
    // }
    // this.logger.debug(`Usuário ${user.id} encontrado no banco para RolesGuard.`);

    const hasRequiredRole = requiredRoles.some((role) =>
      user.papeis.includes(role),
    );
    if (!hasRequiredRole) {
      this.logger.warn(
        `Usuário ${user.cpfCnpj} (ID: ${user.id}) com papéis [${user.papeis}] não possui os papéis requeridos [${requiredRoles}].`,
      );
    }
    return hasRequiredRole;
  }
}
