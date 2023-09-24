import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonDto } from './dto/lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindLessonByProfessorParametersDto } from 'src/lessons/dto/find-lesson-by-professor-params.dto';
import { GetTimesDto } from 'src/lessons/dto/get-times.dto';
import { GetWeekDayDto } from 'src/lessons/dto/get-week-day.dto';

@Controller('lessons')
@ApiTags('Занятия')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post('create')
  public create(@Body() lessonDto: LessonDto) {
    return this.lessonsService.create(lessonDto);
  }

  @Get('findOne/:id')
  public findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch('update/:id')
  public update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete('delete/:id')
  public delete(@Param('id') id: string) {
    return this.lessonsService.delete(+id);
  }

  @Post('findOneByProfessorParameters')
  public findLessonByProfessorParameters(
    @Body() findLessonByParameters: FindLessonByProfessorParametersDto,
  ) {
    return this.lessonsService.findLessonByProfessorParameters(
      findLessonByParameters,
    );
  }

  @Post('getTimes')
  public getTimes(@Body() getTimesDto: GetTimesDto) {
    return this.lessonsService.getTimes(getTimesDto);
  }

  @Post('getWeekDays')
  public getWeekDays(@Body() getWeekDays: GetWeekDayDto) {
    return this.lessonsService.getWeekDays(getWeekDays);
  }

  @Get('studentCountOnLesson/:id')
  public studentCountOnLesson(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Get('findAllForProfessorSubjectGroup/:professor_login/:subject_id/:group_id')
  public findAllForSubjectGroup(
    @Param('professor_login') professor_login: string,
    @Param('subject_id') subject_id: number,
    @Param('group_id') group_id: number,
  ) {
    return this.lessonsService.findAllForSubjectGroup(
      professor_login,
      +subject_id,
      +group_id,
    );
  }
}
