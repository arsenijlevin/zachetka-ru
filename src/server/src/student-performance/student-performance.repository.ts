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

  public async findAllForSubjectGroup(subject_id: number, group_id: number) {
    try {
      const studentGrades = await this.prismaService.users.findMany({
        where: {
          students_group: {
            group_id: group_id,
            groups: {
              groups_subject: {
                some: {
                  subject_id: subject_id
                }
              }
            }
          },
        },
        include: {
          student_performance: true
        }
      })
      const safeStudentGrades = studentGrades.map(grade => this.prismaService.exclude(grade, ["password"]))
      return safeStudentGrades;
    } catch (error) {
      return null;
    }
  }

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

  public async findAllForStudent(studentLogin: string) {
    try {
      const studentPerformances = await this.prismaService.student_performance.findMany({
        where: {
          student_login: studentLogin
        }
      });

      return studentPerformances;
    } catch (error) {
      return null;
    }
  }

  public async upsert(
    studentLogin: string,
    subjectId: number,
    updateStudentPerformanceDto: UpdateStudentPerformanceDto): Promise<StudentPerformanceDto | null> {
    try {
      const studentPerformance = await this.prismaService.student_performance.upsert({
        where: {
          student_login_subject_id: {
            student_login: studentLogin,
            subject_id: subjectId
          }
        },
        update: updateStudentPerformanceDto,
        create: {
          student_login: studentLogin,
          subject_id: subjectId,
          ...updateStudentPerformanceDto
        }
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