import { Injectable } from "@nestjs/common";
import { SubjectDto } from "./dto/subject.dto";
import { PrismaService } from "../prisma.service";
import { FindAllSubjectsDTO } from "./dto/find-all.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";


@Injectable()
export class SubjectsRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  public async findOne(id: number): Promise<SubjectDto | undefined> {
    const subject = await this.prismaService.subjects.findUnique({
      where: {
        id
      }
    });
    return subject;
  }

  public async save(subject: SubjectDto): Promise<SubjectDto> {
    const newSubject = await this.prismaService.subjects.create({
      data: subject
    });
    return newSubject;
  }

  public async findAll(findAllSubjectsDTO: FindAllSubjectsDTO): Promise<SubjectDto[]> {
    const subjects = await this.prismaService.subjects.findMany({
      skip: findAllSubjectsDTO.skip,
      take: findAllSubjectsDTO.take
    });
    return subjects;
  }

  public async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<SubjectDto | null> {
    try {
      const subject = await this.prismaService.subjects.update({
        where: {
          id: id
        },
        data: updateSubjectDto
      });
      return subject;
    } catch (error) {
      return null;
    }
  }

  public async delete(id: number): Promise<SubjectDto | undefined> {
    const subject = await this.prismaService.subjects.delete({
      where: {
        id: id
      }
    });
    return subject;
  }
}