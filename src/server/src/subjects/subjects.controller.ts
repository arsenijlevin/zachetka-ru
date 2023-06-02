import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectDto } from './dto/subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) { }

  @Post("create")
  public create(@Body() subjectDto: SubjectDto) {
    return this.subjectsService.create(subjectDto);
  }

  @Get("findAll")
  public findAll() {
    return this.subjectsService.findAll();
  }

  @Get('findOne')
  public findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  @Patch('update')
  public update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  @Delete('delete')
  public delete(@Param('id') id: string) {
    return this.subjectsService.delete(+id);
  }
}
