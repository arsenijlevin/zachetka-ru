import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupDto } from './dto/group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('groups')
@ApiTags('Учебные группы')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('create')
  public create(@Body() groupDto: GroupDto) {
    return this.groupsService.create(groupDto);
  }

  @Get('getGroupsForSubjectProfessor/:subject_id/:professor_login')
  public getGroupsForSubjectProfessor(
    @Param('subject_id') subject_id: number,
    @Param('professor_login') professor_login: string,
  ) {
    return this.groupsService.getGroupsForSubjectProfessor(subject_id, professor_login)
  }

    @Get('findOne/:id')
  public findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Patch('update/:id')
  public update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete('delete/:id')
  public delete(@Param('id') id: string) {
    return this.groupsService.delete(+id);
  }
}
