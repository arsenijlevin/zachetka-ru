import { Module } from '@nestjs/common';
import { TestingService } from './testing.service';
import { TestingController } from './testing.controller';

export const moduleSettings = {
  controllers: [TestingController],
  providers: [TestingService],
}

@Module(moduleSettings)
export class TestingModule { }
