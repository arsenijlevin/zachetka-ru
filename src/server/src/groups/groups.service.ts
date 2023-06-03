import { HttpException, Injectable } from '@nestjs/common';
import { GroupsRepository } from './groups.repository';
import { GroupDto } from './dto/group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { FindAllGroupsDTO } from './dto/find-all.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly groupsRepository: GroupsRepository) { }

  public async create(createGroupDto: GroupDto) {
    const newGroup = await this.groupsRepository.save(createGroupDto);

    if (!newGroup) {
      throw new HttpException('Cannot create group with this parameters', 400);
    }

    return newGroup;
  }

  public async findAll(findAllGroupsDTO: FindAllGroupsDTO) {
    return await this.groupsRepository.findAll(findAllGroupsDTO);
  }

  public async findOne(id: number) {
    const group = await this.groupsRepository.findOne(id);

    if (!group) {
      throw new HttpException('Group not found', 404);
    }

    return group;
  }

  public async update(id: number, updateGroupDto: UpdateGroupDto) {
    const updatedGroup = await this.groupsRepository.update(id, updateGroupDto);

    if (!updatedGroup) {
      throw new HttpException('Group not found', 404);
    }

    return updatedGroup;
  }

  public async delete(id: number) {
    const deletedGroup = await this.groupsRepository.delete(id);

    if (!deletedGroup) {
      throw new HttpException('Group not found', 404);
    }

    return deletedGroup;
  }
}
