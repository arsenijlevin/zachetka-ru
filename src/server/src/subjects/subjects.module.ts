import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SubjectsRepository } from '@src/subjects/subjects.repository';
import { PrismaService } from '@src/prisma.service';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService, SubjectsRepository, PrismaService],
})
export class SubjectsModule { }
