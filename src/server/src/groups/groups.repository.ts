import { Injectable } from '@nestjs/common';
import { GroupDto } from './dto/group.dto';
import { PrismaService } from '../prisma.service';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async save(group: GroupDto): Promise<GroupDto | null> {
    try {
      const newGroup = await this.prismaService.groups.create({
        data: group,
      });

      return newGroup;
    } catch (error) {
      return null;
    }
  }

  public async findOne(id: number): Promise<GroupDto | null> {
    try {
      const group = await this.prismaService.groups.findUnique({
        where: {
          id,
        },
      });
      return group;
    } catch (error) {
      return null;
    }
  }
  public async findForStudent(student_login: string) {
    try {
      const group = await this.prismaService.students_group.findUnique({
        where: {
          login: student_login,
        },
        include: {
          groups: true,
        },
      });
      return group;
    } catch (error) {
      return null;
    }
  }

  public async getGroupsForSubjectProfessor(
    subject_id: number,
    professor_login: string,
  ) {
    try {
      const groups = await this.prismaService.groups.findMany({
        where: {
          groups_subject: {
            some: {
              subject_id: subject_id,
              subjects: {
                professor_subject: {
                  some: {
                    professor_login: professor_login,
                  },
                },
              },
            },
          },
        },
      });
      return groups;
    } catch (error) {
      return null;
    }
  }

  public async update(
    id: number,
    updateGroupDto: UpdateGroupDto,
  ): Promise<GroupDto | null> {
    try {
      const group = await this.prismaService.groups.update({
        where: {
          id: id,
        },
        data: updateGroupDto,
      });
      return group;
    } catch (error) {
      return null;
    }
  }

  public async delete(id: number): Promise<GroupDto | null> {
    try {
      const group = await this.prismaService.groups.delete({
        where: {
          id: id,
        },
      });
      return group;
    } catch (error) {
      return null;
    }
  }
}
