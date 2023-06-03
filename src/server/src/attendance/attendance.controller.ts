import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
@ApiTags("Посещаемость")
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Post("post")
  public create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get("findAll")
  public findAll() {
    return this.attendanceService.findAll();
  }

  @Get('findOne/:id')
  public findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @Patch('update/:id')
  public update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Delete('delete/:id')
  public delete(@Param('id') id: string) {
    return this.attendanceService.delete(+id);
  }
}
