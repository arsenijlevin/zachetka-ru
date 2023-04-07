import { Module } from '@nestjs/common';
import { TestingService } from './testing.service';
import { TestingController } from './testing.controller';

@Module({
  controllers: [TestingController],
  providers: [TestingService],
})
export class TestingModule {}
