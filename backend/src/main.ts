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

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

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

  app.setGlobalPrefix('agriledger-api');
  await app.listen(process.env.BACKEND_PORT ?? 3000, '0.0.0.0');
}
bootstrap();
