import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetAttendanceDto } from './dto/get-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceRepository {
  constructor(private readonly prismaService: PrismaService) { }

  public async findAllForStudent(student_login: string, subject_id: number): Promise<GetAttendanceDto[]> {
    try {
      const attendance = await this.prismaService.attendance.findMany({
        where: {
          student_login,
          lessons: {
            is: {
              subject_id: {
                equals: subject_id
              }
            }
          }
        },
        include: {
          lessons: {
            select: {
              time: true,
              subject_id: true
            }
          },
        }
      })

      return attendance.map(attendanceItem => ({
        student_login: attendanceItem.student_login,
        subject_id: attendanceItem.lessons.subject_id,
        status: attendanceItem.status,
        date: attendanceItem.date.toISOString(),
        time: attendanceItem.lessons.time
      }));
    } catch (error) {
      return null;
    }
  }

  public async upsert(updateAttendanceDto: UpdateAttendanceDto) {
    try {

      console.log({
        professor_login: updateAttendanceDto.professor_login,
        time: updateAttendanceDto.time,
        week_day: updateAttendanceDto.week_day,
        subject_id: updateAttendanceDto.subject_id,
        frequency: updateAttendanceDto.frequency
      });

      const lesson = await this.prismaService.lessons.findFirst({
        where: {
          professor_login: updateAttendanceDto.professor_login,
          time: updateAttendanceDto.time,
          week_day: updateAttendanceDto.week_day,
          subject_id: updateAttendanceDto.subject_id,
          frequency: updateAttendanceDto.frequency
        }
      })

      const attendance = await this.prismaService.attendance.upsert({
        where: {
          student_login_lesson_id_date: {
            student_login: updateAttendanceDto.student_login,
            lesson_id: lesson.id,
            date: updateAttendanceDto.date
          },
        },
        create: {
          student_login: updateAttendanceDto.student_login,
          lesson_id: lesson.id,
          date: updateAttendanceDto.date,
          status: updateAttendanceDto.status
        },
        update: {
          status: updateAttendanceDto.status
        },
        include: {
          lessons: {
            select: {
              time: true
            }
          }
        }
      })

      return {
        ...attendance,
        time: attendance.lessons.time
      };
    } catch (error) {
      console.log(error);

      return null;
    }
  }

}
