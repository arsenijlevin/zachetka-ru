import { HttpException, Injectable } from '@nestjs/common';
import { LessonsRepository } from './lessons.repository';
import { LessonDto } from './dto/lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FindAllLessonsDTO } from './dto/find-all.dto';
import { FindLessonByProfessorParametersDto } from 'src/lessons/dto/find-lesson-by-professor-params.dto';
import { FindLessonByStudentParametersDto } from 'src/lessons/dto/find-lesson-by-student-parameters.dto';
import { GetTimesDto } from 'src/lessons/dto/get-times.dto';
import { GetWeekDayDto } from 'src/lessons/dto/get-week-day.dto';

@Injectable()
export class LessonsService {
  constructor(private readonly lessonsRepository: LessonsRepository) {}

  public async create(createLessonDto: LessonDto) {
    const newLesson = await this.lessonsRepository.save(createLessonDto);

    if (!newLesson) {
      throw new HttpException('Cannot create lesson with this parameters', 400);
    }

    return newLesson;
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
    const updatedLesson = await this.lessonsRepository.update(
      id,
      updateLessonDto,
    );

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

  public async getTimes(getTimesDto: GetTimesDto) {
    return await this.lessonsRepository.getTimes(getTimesDto);
  }

  public async getWeekDays(getWeekDays: GetWeekDayDto) {
    return await this.lessonsRepository.getWeekDays(getWeekDays);
  }

  public async studentCountOnLesson(lessonId: number) {
    return await this.lessonsRepository.studentCountOnLesson(lessonId);
  }

  public async findLessonByStudentParameters(
    findLessonByParametersDTO: FindLessonByStudentParametersDto,
  ) {
    return await this.lessonsRepository.findLessonByStudentParameters(
      findLessonByParametersDTO,
    );
  }

  public async findLessonByProfessorParameters(
    findLessonByParametersDTO: FindLessonByProfessorParametersDto,
  ) {
    return await this.lessonsRepository.findLessonByProfessorParameters(
      findLessonByParametersDTO,
    );
  }

  public async findAllForSubjectGroup(
    professor_login: string,
    subject_id: number,
    group_id: number,
  ) {
    return await this.lessonsRepository.findAllForSubjectGroup(
      professor_login,
      subject_id,
      group_id,
    );
  }
}
