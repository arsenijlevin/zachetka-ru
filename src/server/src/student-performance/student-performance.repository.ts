import { Injectable } from "@nestjs/common";
import { StudentPerformanceDto } from "./dto/student-performance.dto";
import { PrismaService } from "../prisma.service";
import { FindAllStudentPerformanceDTO } from "./dto/find-all.dto";
import { UpdateStudentPerformanceDto } from "./dto/update-student-performance.dto";


@Injectable()
export class StudentPerformanceRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  public async findOne(studentLogin: string, subjectId: number): Promise<StudentPerformanceDto | undefined> {
    try {
      const studentPerformance = await this.prismaService.student_performance.findUnique({
        where: {
          student_login_subject_id: {
            student_login: studentLogin,
            subject_id: subjectId
          }
        }
      });
      return studentPerformance;
    } catch (error) {
      return null;
    }
  }

  public async save(studentPerformance: StudentPerformanceDto): Promise<StudentPerformanceDto> {
    try {
      const newStudentPerformance = await this.prismaService.student_performance.create({
        data: studentPerformance
      });

      return newStudentPerformance;
    } catch (error) {
      return null;
    }
  }

  public async findAll(findAllStudentPerformancesDTO: FindAllStudentPerformanceDTO): Promise<StudentPerformanceDto[]> {
    const studentPerformances = await this.prismaService.student_performance.findMany({
      skip: findAllStudentPerformancesDTO.skip,
      take: findAllStudentPerformancesDTO.take
    });
    return studentPerformances;
  }

  public async update(
    studentLogin: string,
    subjectId: number,
    updateStudentPerformanceDto: UpdateStudentPerformanceDto): Promise<StudentPerformanceDto | null> {
    try {
      const studentPerformance = await this.prismaService.student_performance.update({
        where: {
          student_login_subject_id: {
            student_login: studentLogin,
            subject_id: subjectId
          }
        },
        data: updateStudentPerformanceDto
      });
      return studentPerformance;
    } catch (error) {
      return null;
    }
  }

  public async delete(studentLogin: string, subjectId: number): Promise<StudentPerformanceDto | undefined> {
    try {
      const studentPerformance = await this.prismaService.student_performance.delete({
        where: {
          student_login_subject_id: {
            student_login: studentLogin,
            subject_id: subjectId
          }
        }
      });
      return studentPerformance;
    } catch (error) {
      return null;
    }
  }
}