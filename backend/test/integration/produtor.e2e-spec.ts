import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Produtor (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/produtores (GET) deve retornar 200', async () => {
    const response = await request(app.getHttpServer()).get('/produtores');
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
