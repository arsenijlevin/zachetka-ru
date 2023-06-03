import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentPerformanceService } from './student-performance.service';
import { StudentPerformanceDto } from './dto/student-performance.dto';
import { UpdateStudentPerformanceDto } from './dto/update-student-performance.dto';
import { FindAllStudentPerformanceDTO } from './dto/find-all.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('studentPerformances')
@ApiTags('Занятия')
export class StudentPerformanceController {
  constructor(private readonly studentPerformancesService: StudentPerformanceService) { }

  @Post("create")
  public create(@Body() studentPerformanceDto: StudentPerformanceDto) {
    return this.studentPerformancesService.create(studentPerformanceDto);
  }

  @Get("findAll")
  public findAll(@Body() findAllStudentPerformancesDTO: FindAllStudentPerformanceDTO) {
    return this.studentPerformancesService.findAll(findAllStudentPerformancesDTO);
  }

  @Get('findOne/:student_login/:subject_id')
  public findOne(
    @Param('student_login') studentLogin: string,
    @Param('subject_id') subjectId: number
  ) {
    return this.studentPerformancesService.findOne(studentLogin, +subjectId);
  }

  @Patch('update/:student_login/:subject_id')
  public update(
    @Param('student_login') studentLogin: string,
    @Param('subject_id') subjectId: number,
    @Body() updateStudentPerformanceDto: UpdateStudentPerformanceDto
  ) {
    return this.studentPerformancesService.update(studentLogin, +subjectId, updateStudentPerformanceDto);
  }

  @Delete('delete/:student_login/:subject_id')
  public delete(
    @Param('student_login') studentLogin: string,
    @Param('subject_id') subjectId: number
  ) {
    return this.studentPerformancesService.delete(studentLogin, +subjectId);
  }
}
