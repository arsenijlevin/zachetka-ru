import { Injectable } from "@nestjs/common";
import { LessonDto } from "./dto/lesson.dto";
import { PrismaService } from "../prisma.service";
import { FindAllLessonsDTO } from "./dto/find-all.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";


@Injectable()
export class LessonsRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  public async findOne(id: number): Promise<LessonDto | undefined> {
    try {
      const lesson = await this.prismaService.lessons.findUnique({
        where: {
          id
        },
        include: {
          groups_lesson: {
            include: {
              groups: true,
              lessons: true
            }
          }
        }
      });
      return {
        groups_id: lesson.groups_lesson.map(group => group.groups.id),
        ...lesson
      };
    } catch (error) {
      return null;
    }
  }

  public async save(lesson: LessonDto): Promise<LessonDto> {
    try {
      const newLesson = await this.prismaService.lessons.create({
        data: {
          professor_login: lesson.professor_login,
          id: lesson.id,
          week_day: lesson.week_day,
          time: lesson.time,
          subject_id: lesson.subject_id,
          place: lesson.place,
          frequency: lesson.frequency
        }
      });

      await this.prismaService.groups_lesson.createMany({
        data: lesson.groups_id.map(group_id => {
          return {
            group_id: group_id,
            lesson_id: newLesson.id
          }
        }),
        skipDuplicates: true
      })

      return lesson;
    } catch (error) {
      return null;
    }
  }

  public async findAll(findAllLessonsDTO: FindAllLessonsDTO): Promise<LessonDto[]> {
    const lessons = await this.prismaService.lessons.findMany({
      skip: findAllLessonsDTO.skip,
      take: findAllLessonsDTO.take,
      include: {
        groups_lesson: {
          include: {
            groups: true,
            lessons: true
          }
        }
      }
    });
    return lessons.map(lesson => ({
      groups_id: lesson.groups_lesson.map(group => group.groups.id),
      ...lesson
    }));
  }

  public async update(id: number, updateLessonDto: UpdateLessonDto): Promise<LessonDto | null> {
    try {
      const lesson = await this.prismaService.lessons.update({
        where: {
          id: id
        },
        include: {
          groups_lesson: {
            include: {
              groups: true,
              lessons: true
            }
          }
        },
        data: updateLessonDto
      });
      return {
        groups_id: lesson.groups_lesson.map(group => group.groups.id),
        ...lesson
      };
    } catch (error) {
      return null;
    }
  }

  public async delete(id: number): Promise<LessonDto | undefined> {
    try {
      const lesson = await this.prismaService.lessons.delete({
        where: {
          id: id
        },
        include: {
          groups_lesson: {
            include: {
              groups: true,
              lessons: true
            }
          }
        }
      });
      return {
        groups_id: lesson.groups_lesson.map(group => group.groups.id),
        ...lesson
      };
    } catch (error) {
      return null;
    }
  }
}