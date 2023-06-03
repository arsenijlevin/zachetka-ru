import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentPerformanceService } from './student-performance.service';
import { StudentPerformanceDto } from './dto/student-performance.dto';
import { UpdateStudentPerformanceDto } from './dto/update-student-performance.dto';
import { FindAllStudentPerformanceDTO } from './dto/find-all.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('student-performance')
@ApiTags('Успеваемость студентов')
export class StudentPerformanceController {
  constructor(private readonly studentPerformanceService: StudentPerformanceService) { }

  @Post("create")
  public create(@Body() studentPerformanceDto: StudentPerformanceDto) {
    return this.studentPerformanceService.create(studentPerformanceDto);
  }

  @Get("findAll")
  public findAll(@Body() findAllStudentPerformancesDTO: FindAllStudentPerformanceDTO) {
    return this.studentPerformanceService.findAll(findAllStudentPerformancesDTO);
  }

  @Get('findAll/:student_login')
  public findAllForStudent(
    @Param('student_login') studentLogin: string,
  ) {
    return this.studentPerformanceService.findAllForStudent(studentLogin);
  }

  @Get('findOne/:student_login/:subject_id')
  public findOne(
    @Param('student_login') studentLogin: string,
    @Param('subject_id') subjectId: number
  ) {
    return this.studentPerformanceService.findOne(studentLogin, +subjectId);
  }

  @Patch('update/:student_login/:subject_id')
  public update(
    @Param('student_login') studentLogin: string,
    @Param('subject_id') subjectId: number,
    @Body() updateStudentPerformanceDto: UpdateStudentPerformanceDto
  ) {
    return this.studentPerformanceService.update(studentLogin, +subjectId, updateStudentPerformanceDto);
  }

  @Delete('delete/:student_login/:subject_id')
  public delete(
    @Param('student_login') studentLogin: string,
    @Param('subject_id') subjectId: number
  ) {
    return this.studentPerformanceService.delete(studentLogin, +subjectId);
  }
}
