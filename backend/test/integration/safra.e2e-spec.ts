import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Safra (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/safras (GET) deve retornar 200', async () => {
    const response = await request(app.getHttpServer()).get('/safras');
    expect(response.status).toBe(200);
  });

  it('/safras (POST) deve validar campos obrigatórios', async () => {
    const response = await request(app.getHttpServer())
      .post('/safras')
      .send({ nome: 'Safra 2025' });
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
