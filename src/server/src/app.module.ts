import { Module } from '@nestjs/common';
import { TestingModule } from './testing/testing.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { SubjectsModule } from './subjects/subjects.module';
import { LessonsModule } from './lessons/lessons.module';
import { GroupsModule } from './groups/groups.module';
import { StudentPerformanceModule } from './student-performance/student-performance.module';
import { AttendanceModule } from './attendance/attendance.module';

export const moduleSettings = {
  imports: [
    TestingModule,
    SubjectsModule,
    UsersModule,
    AuthModule,
    LessonsModule,
    GroupsModule,
    AttendanceModule,
    StudentPerformanceModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
};

@Module(moduleSettings)
export class AppModule { }
