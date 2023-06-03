import { HttpException, Injectable } from '@nestjs/common';
import { LessonsRepository } from './lessons.repository';
import { LessonDto } from './dto/lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FindAllLessonsDTO } from '@src/lessons/dto/find-all.dto';

@Injectable()
export class LessonsService {
  constructor(private readonly lessonsRepository: LessonsRepository) { }

  public async create(createLessonDto: LessonDto) {
    return await this.lessonsRepository.save(createLessonDto);
  }

  public async findAll(findAllLessonsDTO: FindAllLessonsDTO) {
    return await this.lessonsRepository.findAll(findAllLessonsDTO);
  }

  public async findOne(id: number) {
    const lesson = await this.lessonsRepository.findOne(id);

    if (!lesson) {
      throw new HttpException('Lesson not found', 404);
    }

    return lesson;
  }

  public async update(id: number, updateLessonDto: UpdateLessonDto) {
    const updatedLesson = await this.lessonsRepository.update(id, updateLessonDto);

    if (!updatedLesson) {
      throw new HttpException('Lesson not found', 404);
    }

    return updatedLesson;
  }

  public async delete(id: number) {
    const deletedLesson = await this.lessonsRepository.delete(id);

    if (!deletedLesson) {
      throw new HttpException('Lesson not found', 404);
    }

    return deletedLesson;
  }
}
