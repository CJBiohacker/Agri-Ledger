import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Cultura (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/culturas (GET) deve retornar 200', async () => {
    const response = await request(app.getHttpServer()).get('/culturas');
    expect(response.status).toBe(200);
  });

  it('/culturas (POST) deve validar campos obrigatórios', async () => {
    const response = await request(app.getHttpServer())
      .post('/culturas')
      .send({ nome: 'Soja' });
    expect(response.status).toBe(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
