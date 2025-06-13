import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === 'string' ? res : ((res as any).message ?? message);
    } else if (exception?.name === 'SequelizeUniqueConstraintError') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Registro já existe ou campo único duplicado.';
    } else if (exception?.name === 'SequelizeValidationError') {
      status = HttpStatus.BAD_REQUEST;
      message =
        exception.errors?.map((e: any) => e.message).join('; ') ??
        'Erro de validação.';
    } else if (exception?.name === 'SequelizeForeignKeyConstraintError') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Chave estrangeira inválida ou relacionada não encontrada.';
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request?.url,
      message,
    };

    // Log detalhado do erro
    Logger.error(
      `Erro ${status} em ${request?.method} ${request?.url}: ${message}`,
      exception?.stack,
      'AllExceptionsFilter',
    );

    // Detecta se é Fastify ou Express
    if (
      typeof response.status === 'function' &&
      typeof (response as FastifyReply).send === 'function'
    ) {
      // Fastify
      response.status(status).send(errorResponse);
    } else if (
      typeof response.status === 'function' &&
      typeof response.json === 'function'
    ) {
      // Express
      response.status(status).json(errorResponse);
    } else {
      // fallback
      response.send(errorResponse);
    }
  }
}
