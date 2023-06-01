import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';

export const moduleSettings = {
  controllers: [UsersController],
  providers: [UsersService, PrismaService]
};

@Module(moduleSettings)
export class UsersModule { }
