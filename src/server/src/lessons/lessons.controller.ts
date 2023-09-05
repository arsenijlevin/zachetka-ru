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
import { FindAllLessonsDTO } from './dto/find-all.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('lessons')
@ApiTags('Занятия')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post('create')
  public create(@Body() lessonDto: LessonDto) {
    return this.lessonsService.create(lessonDto);
  }

  @Get('findAll')
  public findAll(@Body() findAllLessonsDTO: FindAllLessonsDTO) {
    return this.lessonsService.findAll(findAllLessonsDTO);
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
}
