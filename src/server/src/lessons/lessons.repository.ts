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
        }
      });
      return lesson;
    } catch (error) {
      return null;
    }
  }

  public async save(lesson: LessonDto): Promise<LessonDto> {
    try {
      const newLesson = await this.prismaService.lessons.create({
        data: lesson
      });

      return newLesson;
    } catch (error) {
      return null;
    }
  }

  public async findAll(findAllLessonsDTO: FindAllLessonsDTO): Promise<LessonDto[]> {
    const lessons = await this.prismaService.lessons.findMany({
      skip: findAllLessonsDTO.skip,
      take: findAllLessonsDTO.take
    });
    return lessons;
  }

  public async update(id: number, updateLessonDto: UpdateLessonDto): Promise<LessonDto | null> {
    try {
      const lesson = await this.prismaService.lessons.update({
        where: {
          id: id
        },
        data: updateLessonDto
      });
      return lesson;
    } catch (error) {
      return null;
    }
  }

  public async delete(id: number): Promise<LessonDto | undefined> {
    try {
      const lesson = await this.prismaService.lessons.delete({
        where: {
          id: id
        }
      });
      return lesson;
    } catch (error) {
      return null;
    }
  }
}