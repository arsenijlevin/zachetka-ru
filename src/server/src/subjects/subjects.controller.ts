import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectDto } from './dto/subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('subjects')
@ApiTags('Дисциплины')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post('create')
  public create(@Body() subjectDto: SubjectDto) {
    return this.subjectsService.create(subjectDto);
  }

  @Get('findAllForProfessor/:professor_login')
  public findAllForProfessor(
    @Param('professor_login') professor_login: string,
  ) {
    return this.subjectsService.findAllForProfessor(professor_login);
  }

  @Get('findOne/:id')
  public findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  @Patch('update/:id')
  public update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  @Delete('delete/:id')
  public delete(@Param('id') id: string) {
    return this.subjectsService.delete(+id);
  }
}
