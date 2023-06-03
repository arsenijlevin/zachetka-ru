import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GroupsRepository } from '@src/groups/groups.repository';
import { PrismaService } from '@src/prisma.service';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, GroupsRepository, PrismaService]
})
export class GroupsModule { }
