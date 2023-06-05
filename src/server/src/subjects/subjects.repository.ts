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
    try {
      const subject = await this.prismaService.subjects.findUnique({
        where: {
          id
        },
        include: {
          professor_subject: {
            include: {
              users: {
                select: {
                  login: true
                }
              }
            }
          },
          groups_subject: {
            include: {
              groups: {
                select: {
                  id: true
                }
              }
            }
          }
        },
      });
      return {
        professors_login: subject.professor_subject.map(professor => professor.users.login),
        groups_id: subject.groups_subject.map(group => group.groups.id),
        ...subject
      };
    } catch (error) {
      return null;
    }
  }

  public async save(subject: SubjectDto): Promise<SubjectDto> {
    try {
      const newSubject = await this.prismaService.subjects.create({
        data: {
          title: subject.title,
          semester: subject.semester,
          reporting_type: subject.reporting_type
        },
        include: {
          professor_subject: {
            include: {
              users: {
                select: {
                  login: true
                }
              }
            }
          },
          groups_subject: {
            include: {
              groups: {
                select: {
                  id: true
                }
              }
            }
          }
        },
      });

      await this.prismaService.professor_subject.createMany({
        data: subject.professors_login.map(professor_login => {
          return {
            professor_login,
            subject_id: newSubject.id
          }
        })
      })

      await this.prismaService.groups_subject.createMany({
        data: subject.groups_id.map(group_id => {
          return {
            group_id,
            subject_id: newSubject.id
          }
        })
      })
    } catch (error) {
      return null;
    }

    return subject;
  }

  public async findAll(findAllSubjectsDTO: FindAllSubjectsDTO): Promise<SubjectDto[]> {
    try {
      const subjects = await this.prismaService.subjects.findMany({
        skip: findAllSubjectsDTO.skip,
        take: findAllSubjectsDTO.take,
        include: {
          professor_subject: {
            include: {
              users: {
                select: {
                  login: true
                }
              }
            }
          },
          groups_subject: {
            include: {
              groups: {
                select: {
                  id: true
                }
              }
            }
          }
        },
      });
      return subjects.map(subject => ({
        professors_login: subject.professor_subject.map(professor => professor.users.login),
        groups_id: subject.groups_subject.map(group => group.groups.id),
        ...subject
      }));
    } catch (error) {
      return null;
    }
  }

  public async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<SubjectDto | null> {
    try {
      const subject = await this.prismaService.subjects.update({
        where: {
          id: id
        },
        include: {
          professor_subject: {
            include: {
              users: {
                select: {
                  login: true
                }
              }
            }
          },
          groups_subject: {
            include: {
              groups: {
                select: {
                  id: true
                }
              }
            }
          }
        },
        data: updateSubjectDto
      });
      return {
        professors_login: subject.professor_subject.map(professor => professor.users.login),
        groups_id: subject.groups_subject.map(group => group.groups.id),
        ...subject
      };
    } catch (error) {
      return null;
    }
  }

  public async delete(id: number): Promise<SubjectDto | undefined> {
    try {
      const subject = await this.prismaService.subjects.delete({
        where: {
          id: id
        },
        include: {
          professor_subject: {
            include: {
              users: {
                select: {
                  login: true
                }
              }
            }
          },
          groups_subject: {
            include: {
              groups: {
                select: {
                  id: true
                }
              }
            }
          }
        }
      });
      return {
        professors_login: subject.professor_subject.map(professor => professor.users.login),
        groups_id: subject.groups_subject.map(group => group.groups.id),
        ...subject
      };
    } catch (error) {
      return null;
    }
  }
}