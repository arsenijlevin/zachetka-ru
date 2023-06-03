import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  public create(createLessonDto: CreateLessonDto) {
    return 'This action adds a new lesson';
  }

  public findAll() {
    return `This action returns all lessons`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  public update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  public remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
