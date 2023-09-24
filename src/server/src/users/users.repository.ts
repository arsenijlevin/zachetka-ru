import { Injectable } from '@nestjs/common';
import { UserUnsafeDto } from './dto/user.dto';
import { PrismaService } from '../prisma.service';
import { FindAllUsersDTO } from './dto/find-all.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findOne(login: string): Promise<UserUnsafeDto | null> {
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          login,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  public async save(user: UserUnsafeDto): Promise<UserUnsafeDto | null> {
    try {
      const newUser = await this.prismaService.users.create({
        data: user,
      });

      console.log(user, newUser);
      

      return newUser;
    } catch (error) {
      return null;
    }
  }

  public async findAll(
    findAllUsersDTO: FindAllUsersDTO,
  ): Promise<UserUnsafeDto[]> {
    const users = await this.prismaService.users.findMany({
      skip: findAllUsersDTO.skip,
      take: findAllUsersDTO.take,
    });
    return users;
  }

  public async update(
    login: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserUnsafeDto | null> {
    try {
      const user = await this.prismaService.users.update({
        where: {
          login: login,
        },
        data: updateUserDto,
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  public async delete(login: string): Promise<UserUnsafeDto | null> {
    try {
      const user = await this.prismaService.users.delete({
        where: {
          login: login,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }
}
