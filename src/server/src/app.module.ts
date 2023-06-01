import { Module } from '@nestjs/common';
import { TestingModule } from './testing/testing.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

export const moduleSettings = {
  imports: [TestingModule, UsersModule, ConfigModule.forRoot()]
};

@Module(moduleSettings)
export class AppModule { }
