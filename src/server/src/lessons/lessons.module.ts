import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { PrismaService } from '../prisma.service';
import { LessonsRepository } from './lessons.repository';

export const moduleSettings = {
  controllers: [LessonsController],
  providers: [LessonsService, PrismaService, LessonsRepository]
}

@Module(moduleSettings)
export class LessonsModule { }
