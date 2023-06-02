import { Module } from '@nestjs/common';
import { TestingModule } from './testing/testing.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';

export const moduleSettings = {
  imports: [
    TestingModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
};

@Module(moduleSettings)
export class AppModule { }
