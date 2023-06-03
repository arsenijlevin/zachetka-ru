import { Module } from '@nestjs/common';
import { StudentPerformanceService } from './student-performance.service';
import { StudentPerformanceController } from './student-performance.controller';
import { StudentPerformanceRepository } from './student-performance.repository';
import { PrismaService } from '../prisma.service';

export const moduleSettings = {
  controllers: [StudentPerformanceController],
  providers: [StudentPerformanceService, StudentPerformanceRepository, PrismaService]
}

@Module(moduleSettings)
export class StudentPerformanceModule { }
