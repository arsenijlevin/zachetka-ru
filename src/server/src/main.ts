import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const prismaService = app.get<PrismaService>(PrismaService);
  prismaService.enableShutdownHooks(app)

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const defaultAdmin = await prismaService.users.findFirst({
    where: {
      login: 'admin_default',
    },
  })

  if (!defaultAdmin) {
    const login = "admin_default";
    const password = await bcrypt.hash(login, 10);


    await prismaService.users.create({
      data: {
        login: login,
        password: password,
        name: "Администратор",
        rights_id: 3
      }
    })

    setTimeout(() => {
      console.warn("Администратор не обнаружен! Создан администратор с стандартными данными admin_default!")
      console.warn("Сразу после запуска измените пароль у администратора admin_default!")
    }, 5000);
  }


  const config = new DocumentBuilder()
    .setTitle(`API веб-приложения "Зачётка.ру"`)
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header'
      },
      'access-token'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 5001);
}

void bootstrap();
