import { Injectable } from '@nestjs/common';
import { LessonDto } from './dto/lesson.dto';
import { PrismaService } from '../prisma.service';
import { FindAllLessonsDTO } from './dto/find-all.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { FindLessonByProfessorParametersDto } from 'src/lessons/dto/find-lesson-by-professor-params.dto';
import { FindLessonByStudentParametersDto } from 'src/lessons/dto/find-lesson-by-student-parameters.dto';
import { GetTimesDto } from 'src/lessons/dto/get-times.dto';
import { GetWeekDayDto } from 'src/lessons/dto/get-week-day.dto';

@Injectable()
export class LessonsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findOne(id: number): Promise<LessonDto | null> {
    try {
      const lesson = await this.prismaService.lessons.findUnique({
        where: {
          id,
        },
        include: {
          groups_lesson: {
            include: {
              groups: true,
              lessons: true,
            },
          },
        },
      });

      if (!lesson) return null;

      return {
        groups_id: lesson.groups_lesson.map((group) => group.groups.id),
        ...lesson,
      };
    } catch (error) {
      return null;
    }
  }

  public async save(lesson: LessonDto): Promise<LessonDto | null> {
    try {
      const newLesson = await this.prismaService.lessons.create({
        data: {
          professor_login: lesson.professor_login,
          id: lesson.id,
          week_day: lesson.week_day,
          time: lesson.time,
          subject_id: lesson.subject_id,
          place: lesson.place,
          frequency: lesson.frequency,
        },
      });

      await this.prismaService.groups_lesson.createMany({
        data: lesson.groups_id.map((group_id) => {
          return {
            group_id: group_id,
            lesson_id: newLesson.id,
          };
        }),
        skipDuplicates: true,
      });

      return lesson;
    } catch (error) {
      return null;
    }
  }

  public async findAll(
    findAllLessonsDTO: FindAllLessonsDTO,
  ): Promise<LessonDto[]> {
    const lessons = await this.prismaService.lessons.findMany({
      skip: findAllLessonsDTO.skip,
      take: findAllLessonsDTO.take,
      include: {
        groups_lesson: {
          include: {
            groups: true,
            lessons: true,
          },
        },
      },
    });
    return lessons.map((lesson) => ({
      groups_id: lesson.groups_lesson.map((group) => group.groups.id),
      ...lesson,
    }));
  }

  public async update(
    id: number,
    updateLessonDto: UpdateLessonDto,
  ): Promise<LessonDto | null> {
    try {
      const lesson = await this.prismaService.lessons.update({
        where: {
          id: id,
        },
        include: {
          groups_lesson: {
            include: {
              groups: true,
              lessons: true,
            },
          },
        },
        data: updateLessonDto,
      });
      return {
        groups_id: lesson.groups_lesson.map((group) => group.groups.id),
        ...lesson,
      };
    } catch (error) {
      return null;
    }
  }

  public async delete(id: number): Promise<LessonDto | null> {
    try {
      const lesson = await this.prismaService.lessons.delete({
        where: {
          id: id,
        },
        include: {
          groups_lesson: {
            include: {
              groups: true,
              lessons: true,
            },
          },
        },
      });
      return {
        groups_id: lesson.groups_lesson.map((group) => group.groups.id),
        ...lesson,
      };
    } catch (error) {
      return null;
    }
  }

  public async findLessonByStudentParameters(
    findLessonByParametersDTO: FindLessonByStudentParametersDto,
  ) {
    try {
      return await this.prismaService.lessons.findFirst({
        where: {
          week_day: findLessonByParametersDTO.week_day,
          time: findLessonByParametersDTO.time,
          frequency: findLessonByParametersDTO.frequency,
          groups_lesson: {
            some: {
              groups: {
                students_group: {
                  some: {
                    login: findLessonByParametersDTO.student_login,
                  },
                },
              },
            },
          },
        },
      });
    } catch (error) {
      return null;
    }
  }
  public async findLessonByProfessorParameters(
    findLessonByParametersDTO: FindLessonByProfessorParametersDto,
  ) {
    try {
      const lesson = await this.prismaService.lessons.findFirst({
        where: {
          ...findLessonByParametersDTO,
        },
        include: {
          groups_lesson: {
            select: {
              groups: {
                select: {
                  students_group: {},
                },
              },
            },
          },
        },
      });

      if (!lesson) return;

      return {
        id: lesson.id,
        week_day: lesson.week_day,
        time: lesson.time,
        subject_id: lesson.subject_id,
        place: lesson.place,
        frequency: lesson.frequency,
        professor_login: lesson.professor_login,
        students_count: lesson.groups_lesson.reduce(
          (prev, all) => prev + all.groups.students_group.length,
          0,
        ),
      };
    } catch (error) {
      return null;
    }
  }

  public async getTimes(getTimesDto: GetTimesDto) {
    try {
      const times = await this.prismaService.lessons.findMany({
        where: {
          ...getTimesDto,
        },
        select: {
          time: true,
          id: true,
        },
      });
      return [...new Set(times.map((time) => time.time))];
    } catch (error) {
      return null;
    }
  }

  public async getWeekDays(getWeekDays: GetWeekDayDto) {
    try {
      const weekDays = await this.prismaService.lessons.findMany({
        where: {
          ...getWeekDays,
        },
        select: {
          week_day: true,
        },
      });
      return [...new Set(weekDays.map((day) => day.week_day))];
    } catch (error) {
      return null;
    }
  }

  public async studentCountOnLesson(lessonId: number): Promise<number> {
    return await this.prismaService.users.count({
      where: {
        lessons: {
          some: {
            id: lessonId,
          },
        },
      },
    });
  }

  public async findAllForSubjectGroup(subject_id: number, group_id: number) {
    return await this.prismaService.lessons.findMany({
      where: {
        groups_lesson: {
          every: {
            group_id: group_id,
          },
        },
        subject_id: subject_id,
      },
    });
  }
}
