import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    const config = new DocumentBuilder()
      .setTitle(`API веб-приложения "Зачётка.ру"`)
      .setVersion('0.0.1')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('swagger', app, document);

    await app.init();
  });

  it('/swagger (GET)', () => {
    return request(app.getHttpServer()).get('/swagger').expect(200);
  });

  it('/api/testing/test (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/testing/test')
      .expect(200)
      .expect('Test.....');
  });

  it('/api/testing/test (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/testing/test')
      .expect(201)
      .expect('postTest');
  });

  it('/api/testing/test-post-with-data (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/testing/test-post-with-data')
      .send({
        someNumber: 0,
        someText: 'string',
      })
      .expect(201);
  });
});
