import { Prisma, users } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: Prisma.usersUncheckedCreateInput): Promise<users> {
    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
  }): Promise<users[]> {
    const { skip, take } = params;
    return this.prisma.users.findMany({
      skip,
      take,
    });
  }

  async findOne(
    usersWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<users | null> {
    return this.prisma.users.findUnique({
      where: usersWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<users> {
    const { where, data } = params;
    return this.prisma.users.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.usersWhereUniqueInput): Promise<users> {
    return this.prisma.users.delete({
      where
    });
  }
}
