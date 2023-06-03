import { Injectable } from "@nestjs/common";
import { GroupDto } from "./dto/group.dto";
import { PrismaService } from "../prisma.service";
import { FindAllGroupsDTO } from "./dto/find-all.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";


@Injectable()
export class GroupsRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  public async findOne(id: number): Promise<GroupDto | undefined> {
    try {
      const group = await this.prismaService.groups.findUnique({
        where: {
          id
        }
      });
      return group;
    } catch (error) {
      return null;
    }
  }

  public async save(group: GroupDto): Promise<GroupDto> {
    try {
      const newGroup = await this.prismaService.groups.create({
        data: group
      });

      return newGroup;
    } catch (error) {
      return null;
    }
  }

  public async findAll(findAllGroupsDTO: FindAllGroupsDTO): Promise<GroupDto[]> {
    const groups = await this.prismaService.groups.findMany({
      skip: findAllGroupsDTO.skip,
      take: findAllGroupsDTO.take
    });
    return groups;
  }

  public async update(id: number, updateGroupDto: UpdateGroupDto): Promise<GroupDto | null> {
    try {
      const group = await this.prismaService.groups.update({
        where: {
          id: id
        },
        data: updateGroupDto
      });
      return group;
    } catch (error) {
      return null;
    }
  }

  public async delete(id: number): Promise<GroupDto | undefined> {
    try {
      const group = await this.prismaService.groups.delete({
        where: {
          id: id
        }
      });
      return group;
    } catch (error) {
      return null;
    }
  }
}