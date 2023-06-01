
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: Prisma.usersUncheckedCreateInput) {
    return await this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
  }) {
    const { skip, take } = params;
    return this.prisma.users.findMany({
      skip,
      take,
    });
  }

  async findOne(
    usersWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ) {
    return await this.prisma.users.findUnique({
      where: usersWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.users.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.usersWhereUniqueInput) {
    return await this.prisma.users.delete({
      where
    });
  }
}
