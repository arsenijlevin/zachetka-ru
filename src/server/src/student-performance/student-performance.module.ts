import { Module } from '@nestjs/common';
import { StudentPerformanceService } from './student-performance.service';
import { StudentPerformanceController } from './student-performance.controller';

export const moduleSettings = {
  controllers: [StudentPerformanceController],
  providers: [StudentPerformanceService]
}

@Module(moduleSettings)
export class StudentPerformanceModule { }
