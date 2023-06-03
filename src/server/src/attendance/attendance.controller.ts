import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostAttendanceDto } from './dto/post-attendance.dto';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
@ApiTags("Посещаемость")
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Get('findAllForStudent/:student_login/:subject_id')
  public findAllForStudent
    (
      @Param('student_login') student_login: string,
      @Param('subject_id') subject_id: number
    ) {
    return this.attendanceService.findAllForStudent(student_login, +subject_id);
  }

  @Patch('post')
  public post(@Body() updateAttendanceDto: PostAttendanceDto) {
    return this.attendanceService.post(updateAttendanceDto);
  }
}
