import { Injectable } from '@nestjs/common';
import { StudentPerformanceDto } from './dto/student-performance.dto';
import { PrismaService } from '../prisma.service';
import { FindAllStudentPerformanceDTO } from './dto/find-all.dto';
import { UpdateStudentPerformanceDto } from './dto/update-student-performance.dto';
import { student_performance } from '@prisma/client';
import { GetStudentScheduleDto } from './dto/get-student-schedule.dto';
import { DateTime, Interval } from 'luxon';
import { StudentSchedule } from './dto/student-schedule.dto';

@Injectable()
export class StudentPerformanceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAllForSubjectGroup(subject_id: number, group_id: number) {
    try {
      const studentGrades = await this.prismaService.users.findMany({
        where: {
          students_group: {
            group_id: group_id,
            groups: {
              groups_subject: {
                some: {
                  subject_id: subject_id,
                },
              },
            },
          },
        },
        include: {
          student_performance: true,
        },
      });
      const safeStudentGrades = studentGrades.map((grade) =>
        this.prismaService.exclude(grade, ['password']),
      );
      return safeStudentGrades;
    } catch (error) {
      return null;
    }
  }

  public async findOne(
    studentLogin: string,
    subjectId: number,
  ): Promise<student_performance | null> {
    try {
      const studentPerformance =
        await this.prismaService.student_performance.findUnique({
          where: {
            student_login_subject_id: {
              student_login: studentLogin,
              subject_id: subjectId,
            },
          },
        });
      return studentPerformance;
    } catch (error) {
      return null;
    }
  }

  public async save(
    studentPerformance: StudentPerformanceDto,
  ): Promise<student_performance | null> {
    try {
      const newStudentPerformance =
        await this.prismaService.student_performance.create({
          data: studentPerformance,
        });

      return newStudentPerformance;
    } catch (error) {
      return null;
    }
  }

  public async findAll(
    findAllStudentPerformancesDTO: FindAllStudentPerformanceDTO,
  ): Promise<student_performance[] | null> {
    const studentPerformances =
      await this.prismaService.student_performance.findMany({
        skip: findAllStudentPerformancesDTO.skip,
        take: findAllStudentPerformancesDTO.take,
      });
    return studentPerformances;
  }

  public async findAllForStudent(studentLogin: string) {
    try {
      const studentPerformances =
        await this.prismaService.student_performance.findMany({
          where: {
            student_login: studentLogin,
          },
        });

      return studentPerformances;
    } catch (error) {
      return null;
    }
  }

  public async upsert(
    studentLogin: string,
    subjectId: number,
    updateStudentPerformanceDto: UpdateStudentPerformanceDto,
  ): Promise<student_performance | null> {
    try {
      const studentPerformance =
        await this.prismaService.student_performance.upsert({
          where: {
            student_login_subject_id: {
              student_login: studentLogin,
              subject_id: subjectId,
            },
          },
          update: updateStudentPerformanceDto,
          create: {
            student_login: studentLogin,
            subject_id: subjectId,
            ...updateStudentPerformanceDto,
          },
        });
      return studentPerformance;
    } catch (error) {
      return null;
    }
  }

  public async delete(
    studentLogin: string,
    subjectId: number,
  ): Promise<student_performance | null> {
    try {
      const studentPerformance =
        await this.prismaService.student_performance.delete({
          where: {
            student_login_subject_id: {
              student_login: studentLogin,
              subject_id: subjectId,
            },
          },
        });

      if (!studentPerformance) return null;

      return studentPerformance;
    } catch (error) {
      return null;
    }
  }

  public async getStudentSchedule(
    student_login: string,
    studentScheduleDto: GetStudentScheduleDto,
  ): Promise<StudentSchedule[] | null> {
    try {
      const startDate = DateTime.fromFormat(
        studentScheduleDto.start_date,
        'dd-MM-yyyy',
      );
      const endDate = DateTime.fromFormat(
        studentScheduleDto.end_date,
        'dd-MM-yyyy',
      );
      if (!startDate.isValid || !endDate.isValid) return [];

      const interval = Interval.fromDateTimes(startDate, endDate);
      const split = interval.splitBy({ day: 1 }).map((d: Interval) => d.start);

      const lessons = await this.prismaService.lessons.findMany({
        where: {
          groups_lesson: {
            every: {
              groups: {
                students_group: {
                  every: {
                    login: student_login,
                  },
                },
              },
            },
          },
        },
        include: {
          subjects: {
            select: {
              title: true,
            },
          },
        },
      });

      const studentSchedule: StudentSchedule[] = [];

      for (const day of split) {
        for (const lesson of lessons) {
          if (lesson.frequency === 'Знаменатель') {
            if (day?.weekNumber && day?.weekNumber % 2 === 0) {
              const lessonWeekDayNumber = getWeekDayNumber(lesson.week_day);

              if (day.weekday === lessonWeekDayNumber) {
                const schedule = studentSchedule.filter(
                  (s) => s.date === day?.toISO(),
                );
                const attendanceInDate =
                  await this.prismaService.attendance.findFirst({
                    where: {
                      lesson_id: lesson.id,
                      date: day.toISO() ?? '',
                    },
                  });
                if (schedule.length === 0) {
                  studentSchedule.push({
                    date: day.toISO() ?? '',
                    lessons: [
                      {
                        time: lesson.time ?? '',
                        title: lesson.subjects.title ?? '',
                        attendance: attendanceInDate?.status ?? '',
                        place: lesson.place ?? '',
                      },
                    ],
                  });
                }
              }
            }
          }

          if (lesson.frequency === 'Числитель') {
            if (day?.weekNumber && day?.weekNumber % 2 === 1) {
              const lessonWeekDayNumber = getWeekDayNumber(lesson.week_day);

              if (day.weekday === lessonWeekDayNumber) {
                const schedule = studentSchedule.filter(
                  (s) => s.date === day?.toISO(),
                );
                const attendanceInDate =
                  await this.prismaService.attendance.findFirst({
                    where: {
                      lesson_id: lesson.id,
                      date: day.toISO() ?? '',
                    },
                  });
                if (schedule.length === 0) {
                  studentSchedule.push({
                    date: day.toISO() ?? '',
                    lessons: [
                      {
                        time: lesson.time ?? '',
                        title: lesson.subjects.title ?? '',
                        attendance: attendanceInDate?.status ?? '',
                        place: lesson.place ?? '',
                      },
                    ],
                  });
                }
              }
            }
          }
        }
      }

      return studentSchedule;
    } catch (error) {
      return null;
    }
  }
}

function getWeekDayNumber(weekDay: string) {
  let number = 1;

  switch (weekDay) {
    case 'ПН': {
      number = 1;
      break;
    }
    case 'ВТ': {
      number = 2;
      break;
    }
    case 'СР': {
      number = 3;
      break;
    }
    case 'ЧТ': {
      number = 4;
      break;
    }
    case 'ПТ': {
      number = 5;
      break;
    }
    case 'СБ': {
      number = 6;
      break;
    }
    case 'ВС': {
      number = 7;
      break;
    }
  }

  return number;
}

export function getDayNumberByWeekDay(weekDay: number) {
  const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

  return weekDays[weekDay];
}

export function getWeekFrequencyFromDay(day: DateTime) {
  if (day?.weekNumber && day?.weekNumber % 2 === 1) {
    return 'Числитель';
  } else {
    return 'Знаменатель';
  }
}
