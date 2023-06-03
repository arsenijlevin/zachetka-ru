import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { PrismaService } from '@src/prisma.service';
import { LessonsRepository } from '@src/lessons/lessons.repository';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService, PrismaService, LessonsRepository]
})
export class LessonsModule { }
