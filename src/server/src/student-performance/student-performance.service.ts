import { StudentPerformanceRepository } from './student-performance.repository';
import { HttpException, Injectable } from '@nestjs/common';
import { StudentPerformanceDto } from './dto/student-performance.dto';
import { UpdateStudentPerformanceDto } from './dto/update-student-performance.dto';
import { FindAllStudentPerformanceDTO } from './dto/find-all.dto';

@Injectable()
export class StudentPerformanceService {
  constructor(private readonly studentPerformanceRepository: StudentPerformanceRepository) { }

  public async create(createLessonDto: StudentPerformanceDto) {
    const newLesson = await this.studentPerformanceRepository.save(createLessonDto);

    if (!newLesson) {
      throw new HttpException('Cannot create lesson with this parameters', 400);
    }

    return newLesson;
  }

  public async findAll(findAllStudentPerformanceDTO: FindAllStudentPerformanceDTO) {
    return await this.studentPerformanceRepository.findAll(findAllStudentPerformanceDTO);
  }

  public async findOne(studentLogin: string, subjectId: number) {
    const lesson = await this.studentPerformanceRepository.findOne(studentLogin, subjectId);

    if (!lesson) {
      throw new HttpException('Lesson not found', 404);
    }

    return lesson;
  }

  public async update(studentLogin: string, subjectId: number, updateLessonDto: UpdateStudentPerformanceDto) {
    const updatedLesson = await this.studentPerformanceRepository.update(studentLogin, subjectId, updateLessonDto);

    if (!updatedLesson) {
      throw new HttpException('Lesson not found', 404);
    }

    return updatedLesson;
  }

  public async delete(studentLogin: string, subjectId: number) {
    const deletedLesson = await this.studentPerformanceRepository.delete(studentLogin, subjectId);

    if (!deletedLesson) {
      throw new HttpException('Lesson not found', 404);
    }

    return deletedLesson;
  }
}
