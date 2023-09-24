import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostAttendanceDto } from './dto/post-attendance.dto';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
@ApiTags('Посещаемость')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('findAllForStudent/:student_login/:subject_id')
  public findAllForStudent(
    @Param('student_login') student_login: string,
    @Param('subject_id') subject_id: number,
  ) {
    return this.attendanceService.findAllForStudent(student_login, +subject_id);
  }

  @Get('findAllForSubjectGroupProfessor/:professor_login/:subject_id/:group_id')
  public findAllForSubjectGroup(
    @Param('professor_login') professor_login: string,
    @Param('subject_id') subject_id: number,
    @Param('group_id') group_id: number,
  ) {
    return this.attendanceService.findAllForSubjectGroup(
      professor_login,
      +subject_id,
      +group_id,
    );
  }

  @Post('post')
  public post(@Body() updateAttendanceDto: PostAttendanceDto) {
    return this.attendanceService.post(updateAttendanceDto);
  }

  @Post('checkAttendance/:student_login/:code')
  public checkAttendance(
    @Param('student_login') student_login: string,
    @Param('code') code: string,
  ) {
    return this.attendanceService.checkAttendance(student_login, code);
  }
  @Post('startAttendanceCodeCheck/:lesson_id/:code')
  public startAttendanceCodeCheck(
    @Param('lesson_id') lesson_id: number,
    @Param('code') code: string,
  ) {
    return this.attendanceService.startAttendanceCodeCheck(+lesson_id, code);
  }
}
