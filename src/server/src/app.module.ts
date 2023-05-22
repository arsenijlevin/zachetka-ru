import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingModule } from './testing/testing.module';
import { UsersModule } from './Users/Users.module';

@Module({
  imports: [TestingModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
