import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GroupsRepository } from './groups.repository';
import { PrismaService } from '../prisma.service';

export const moduleSettings = {
  controllers: [GroupsController],
  providers: [GroupsService, GroupsRepository, PrismaService],
};

@Module(moduleSettings)
export class GroupsModule {}
