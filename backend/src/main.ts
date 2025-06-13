import * as dotenv from 'dotenv';
dotenv.config(); // Garante que as variáveis de ambiente sejam carregadas primeiro

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { API_PREFIX } from './constants';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger:
        process.env.NODE_ENV === 'development'
          ? ['log', 'error', 'warn', 'debug', 'verbose']
          : ['log', 'error', 'warn'],
    },
  );

  await app.register(helmet);

  // Segurança: rate limit (descomentar e configurar se necessário)
  // import rateLimit from '@fastify/rate-limit';
  // await app.register(rateLimit, {
  //   max: 1000, // Ajustar conforme a necessidade
  //   timeWindow: '1 minute',
  // });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix(API_PREFIX.replace('/', ''));

  const config = new DocumentBuilder()
    .setTitle('Agri-Ledger API')
    .setDescription(
      'API para gestão de produtores rurais, propriedades, safras e culturas.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${API_PREFIX}/docs`, app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  Logger.log(
    `🚀 Aplicação rodando em: http://localhost:${port}/${API_PREFIX}/docs`,
    'Bootstrap',
  );
}
bootstrap();
