import { Controller, Get, Body, Param, Delete, Post } from '@nestjs/common';
import { StudentPerformanceService } from './student-performance.service';
import { UpdateStudentPerformanceDto } from './dto/update-student-performance.dto';
import { FindAllStudentPerformanceDTO } from './dto/find-all.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetStudentScheduleDto } from './dto/get-student-schedule.dto';

@Controller('student-performance')
@ApiTags('Успеваемость студентов')
export class StudentPerformanceController {
  constructor(
    private readonly studentPerformanceService: StudentPerformanceService,
  ) {}

  @Get('findAllForSubjectGroup/:subject_id/:group_id')
  public findAllForSubjectGroup(
    @Param('subject_id') subject_id: number,
    @Param('group_id') group_id: number,
  ) {
    return this.studentPerformanceService.findAllForSubjectGroup(
      subject_id,
      group_id,
    );
  }

  @Get('findAll')
  public findAll(
    @Body() findAllStudentPerformancesDTO: FindAllStudentPerformanceDTO,
  ) {
    return this.studentPerformanceService.findAll(
      findAllStudentPerformancesDTO,
    );
  }

  @Get('findAllForStudent/:student_login')
  public findAllForStudent(@Param('student_login') studentLogin: string) {
    return this.studentPerformanceService.findAllForStudent(studentLogin);
  }

  @Get('findOne/:student_login/:subject_id')
  public findOne(
    @Param('student_login') studentLogin: string,
    @Param('subject_id') subjectId: number,
  ) {
    return this.studentPerformanceService.findOne(studentLogin, +subjectId);
  }

  @Post('post-performance/:student_login/:subject_id')
  public postPerformance(
    @Param('student_login') studentLogin: string,
    @Param('subject_id') subjectId: number,
    @Body() updateStudentPerformanceDto: UpdateStudentPerformanceDto,
  ) {
    return this.studentPerformanceService.upsert(
      studentLogin,
      +subjectId,
      updateStudentPerformanceDto,
    );
  }

  @Delete('delete/:student_login/:subject_id')
  public delete(
    @Param('student_login') studentLogin: string,
    @Param('subject_id') subjectId: number,
  ) {
    return this.studentPerformanceService.delete(studentLogin, +subjectId);
  }

  @Post('getStudentSchedule/:student_login')
  public getStudentSchedule(
    @Param('student_login') student_login: string,
    @Body() studentScheduleDto: GetStudentScheduleDto,
  ) {
    return this.studentPerformanceService.getStudentSchedule(
      student_login,
      studentScheduleDto,
    );
  }
}
