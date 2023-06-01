import { Module } from '@nestjs/common';
import { TestingModule } from './testing/testing.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export const moduleSettings = {
  imports: [TestingModule, UsersModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
};

@Module(moduleSettings)
export class AppModule { }
