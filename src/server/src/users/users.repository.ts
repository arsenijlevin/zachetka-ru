import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
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
}