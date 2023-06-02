import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { FindAllUsersDTO } from "./dto/find-all.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDto } from "./dto/user.dto";


@Injectable()
export class UsersRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  public async findOne(login: string): Promise<UserDto | undefined> {
    const user = await this.prismaService.users.findUnique({
      where: {
        login
      }
    });
    return user;
  }

  public async save(user: UserDto): Promise<UserDto> {
    const newUser = await this.prismaService.users.create({
      data: {
        login: user.login,
        name: user.name,
        password: user.password,
        rights_id: user.rights_id
      }
    });
    return newUser;
  }

  public async findAll(findAllUsersDTO: FindAllUsersDTO): Promise<UserDto[]> {
    const users = await this.prismaService.users.findMany({
      skip: findAllUsersDTO.skip,
      take: findAllUsersDTO.take
    });
    return users;
  }

  public async update(login: string, updateUserDto: UpdateUserDto): Promise<UserDto | null> {
    try {
      const user = await this.prismaService.users.update({
        where: {
          login: login
        },
        data: updateUserDto
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  public async delete(login: string): Promise<UserDto | undefined> {
    const user = await this.prismaService.users.delete({
      where: {
        login: login
      }
    });
    return user;
  }
}