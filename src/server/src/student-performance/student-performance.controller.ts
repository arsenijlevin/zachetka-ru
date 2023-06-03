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

  @Get('findOne/:id')
  public findOne(@Param('id') id: string) {
    return this.studentPerformancesService.findOne(+id);
  }

  @Patch('update/:id')
  public update(@Param('id') id: string, @Body() updateStudentPerformanceDto: UpdateStudentPerformanceDto) {
    return this.studentPerformancesService.update(+id, updateStudentPerformanceDto);
  }

  @Delete('delete/:id')
  public delete(@Param('id') id: string) {
    return this.studentPerformancesService.delete(+id);
  }
}
