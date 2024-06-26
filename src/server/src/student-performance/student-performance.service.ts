import { StudentPerformanceRepository } from './student-performance.repository';
import { HttpException, Injectable } from '@nestjs/common';
import { StudentPerformanceDto } from './dto/student-performance.dto';
import { UpdateStudentPerformanceDto } from './dto/update-student-performance.dto';
import { FindAllStudentPerformanceDTO } from './dto/find-all.dto';
import { GetStudentScheduleDto } from './dto/get-student-schedule.dto';

@Injectable()
export class StudentPerformanceService {
  constructor(
    private readonly studentPerformanceRepository: StudentPerformanceRepository,
  ) {}

  public async findAllForSubjectGroup(subject_id: number, group_id: number) {
    const studentPerformance =
      await this.studentPerformanceRepository.findAllForSubjectGroup(
        subject_id,
        group_id,
      );

    if (!studentPerformance) {
      throw new HttpException(
        'Cannot find student-performance with this parameters',
        400,
      );
    }

    return studentPerformance;
  }

  public async create(studentPerformanceDto: StudentPerformanceDto) {
    const newStudentPerformance = await this.studentPerformanceRepository.save(
      studentPerformanceDto,
    );

    if (!newStudentPerformance) {
      throw new HttpException(
        'Cannot create student-performance with this parameters',
        400,
      );
    }

    return newStudentPerformance;
  }

  public async findAll(
    findAllStudentPerformanceDTO: FindAllStudentPerformanceDTO,
  ) {
    return await this.studentPerformanceRepository.findAll(
      findAllStudentPerformanceDTO,
    );
  }

  public async findAllForStudent(studentLogin: string) {
    const studentPerformance =
      await this.studentPerformanceRepository.findAllForStudent(studentLogin);

    if (!studentPerformance) {
      throw new HttpException('Student-performance not found', 404);
    }

    return studentPerformance;
  }

  public async findOne(studentLogin: string, subjectId: number) {
    const studentPerformance = await this.studentPerformanceRepository.findOne(
      studentLogin,
      subjectId,
    );

    if (!studentPerformance) {
      throw new HttpException('Student-performance not found', 404);
    }

    return studentPerformance;
  }

  public async upsert(
    studentLogin: string,
    subjectId: number,
    updateLessonDto: UpdateStudentPerformanceDto,
  ) {
    const updatedStudentPerformance =
      await this.studentPerformanceRepository.upsert(
        studentLogin,
        subjectId,
        updateLessonDto,
      );

    if (!updatedStudentPerformance) {
      throw new HttpException('Student-performance not found', 404);
    }

    return updatedStudentPerformance;
  }

  public async delete(studentLogin: string, subjectId: number) {
    const deletedStudentPerformance =
      await this.studentPerformanceRepository.delete(studentLogin, subjectId);

    if (!deletedStudentPerformance) {
      throw new HttpException('Student-performance not found', 404);
    }

    return deletedStudentPerformance;
  }

  public async getStudentSchedule(
    student_login: string,
    studentScheduleDto: GetStudentScheduleDto,
  ) {
    const studentSchedule =
      await this.studentPerformanceRepository.getStudentSchedule(
        student_login,
        studentScheduleDto,
      );

    if (!studentSchedule) {
      throw new HttpException('Student schedule not found', 404);
    }

    return studentSchedule;
  }
}
