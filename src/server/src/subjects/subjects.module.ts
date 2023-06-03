import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SubjectsRepository } from './subjects.repository';
import { PrismaService } from '../prisma.service';

export const moduleSettings = {
  controllers: [SubjectsController],
  providers: [SubjectsService, SubjectsRepository, PrismaService],
}

@Module(moduleSettings)
export class SubjectsModule { }
