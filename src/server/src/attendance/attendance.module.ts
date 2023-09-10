import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { AttendanceRepository } from './attendance.repository';
import { PrismaService } from '../prisma.service';

export const moduleSettings = {
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceRepository, PrismaService],
};

@Module(moduleSettings)
export class AttendanceModule {}
