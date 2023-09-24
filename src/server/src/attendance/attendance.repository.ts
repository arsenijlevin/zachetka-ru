import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetAttendanceDto } from './dto/get-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAllForStudent(
    student_login: string,
    subject_id: number,
  ): Promise<GetAttendanceDto[] | null> {
    try {
      const attendance = await this.prismaService.attendance.findMany({
        where: {
          student_login,
          lessons: {
            is: {
              subject_id: {
                equals: subject_id,
              },
            },
          },
        },
        include: {
          lessons: {
            select: {
              time: true,
              subject_id: true,
            },
          },
        },
      });

      return attendance.map((attendanceItem) => ({
        student_login: attendanceItem.student_login,
        subject_id: attendanceItem.lessons.subject_id,
        status: attendanceItem.status,
        date: attendanceItem.date.toISOString(),
        time: attendanceItem.lessons.time,
      }));
    } catch (error) {
      return null;
    }
  }

  public async findAllForSubjectGroup(
    professor_login: string,
    subject_id: number,
    group_id: number,
  ) {
    try {
      const attendance = await this.prismaService.users.findMany({
        where: {
          students_group: {
            group_id: group_id,
          },
          lessons: {
            every: {
              subject_id: subject_id,
              professor_login: professor_login,
            },
          },
        },
        include: {
          students_group: {
            select: {
              attendance: {
                where: {
                  lessons: {
                    subject_id: subject_id,
                    groups_lesson: {
                      some: {
                        group_id: group_id,
                        lessons: {
                          professor_login: professor_login,
                        },
                      },
                    },
                  },
                },
                include: {
                  lessons: {
                    select: {
                      time: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return attendance.map((item) => ({
        student: {
          login: item.login,
          name: item.name,
          attendance: item.students_group?.attendance.map((i) => ({
            date: i.date,
            time: i.lessons.time,
            status: i.status,
          })),
        },
      }));
    } catch (error) {
      return null;
    }
  }

  public async upsert(updateAttendanceDto: UpdateAttendanceDto) {
    try {
      const lesson = await this.prismaService.lessons.findFirst({
        where: {
          professor_login: updateAttendanceDto.professor_login,
          time: updateAttendanceDto.time,
          week_day: updateAttendanceDto.week_day,
          subject_id: updateAttendanceDto.subject_id,
          frequency: updateAttendanceDto.frequency,
        },
      });

      if (!lesson) return;

      const attendance = await this.prismaService.attendance.upsert({
        where: {
          student_login_lesson_id_date: {
            student_login: updateAttendanceDto.student_login,
            lesson_id: lesson.id,
            date: updateAttendanceDto.date,
          },
        },
        create: {
          student_login: updateAttendanceDto.student_login,
          lesson_id: lesson.id,
          date: updateAttendanceDto.date,
          status: updateAttendanceDto.status,
        },
        update: {
          status: updateAttendanceDto.status,
        },
        include: {
          lessons: {
            select: {
              time: true,
            },
          },
        },
      });

      return {
        ...attendance,
        time: attendance.lessons.time,
      };
    } catch (error) {
      return null;
    }
  }

  public async checkAttendance(student_login: string, code: string) {
    console.log(student_login, code);

    try {
      const attendanceCode =
        await this.prismaService.attendance_codes.findFirst({
          where: {
            code,
            lessons: {
              groups_lesson: {
                some: {
                  groups: {
                    students_group: {
                      some: {
                        users: {
                          login: student_login,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });

      return !!attendanceCode;
    } catch (error) {
      return null;
    }
  }

  public async startAttendanceCodeCheck(lesson_id: number, code: string) {
    try {
      const attendanceCode = await this.prismaService.attendance_codes.upsert({
        where: {
          code,
        },
        update: {
          code: code,
          lesson_id: lesson_id,
        },
        create: {
          lesson_id: lesson_id,
          code: code,
        },
      });

      return attendanceCode;
    } catch (error) {
      return null;
    }
  }
}
