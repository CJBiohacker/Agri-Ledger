import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Propriedade (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/propriedades (GET) deve retornar 200', async () => {
    const response = await request(app.getHttpServer()).get('/propriedades');
    expect(response.status).toBe(200);
  });

  it('/propriedades (POST) deve validar campos obrigatórios', async () => {
    const response = await request(app.getHttpServer())
      .post('/propriedades')
      .send({ nome: 'Fazenda' });
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
