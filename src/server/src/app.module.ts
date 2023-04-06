import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingModule } from './testing/testing.module';

@Module({
  imports: [TestingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
