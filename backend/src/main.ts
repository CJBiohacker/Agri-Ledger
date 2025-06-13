import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { API_PREFIX } from './constants';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: ['log', 'error', 'warn', 'debug', 'verbose'] },
  );

  // Middleware de log de requisições HTTP
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const ms = Date.now() - start;
      Logger.log(
        `${req.method} ${req.url} ${res.statusCode} - ${ms}ms`,
        'HTTP',
      );
    });
    next();
  });

  // Segurança: headers HTTP
  await app.register(helmet);

  // Segurança: rate limit (exemplo: 100 req/min por IP)
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // Segurança: CORS restrito (ajuste origin conforme necessário)
  app.enableCors({
    origin: [/^https?:\/\/localhost(:\d+)?$/],
    credentials: true,
  });

  // Filtro global para tratamento de erros
  app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix(API_PREFIX.replace('/', ''));
  await app.listen(process.env.BACKEND_PORT ?? 3000, '0.0.0.0');
}
bootstrap();
