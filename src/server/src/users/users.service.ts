import { Injectable } from '@nestjs/common';
import { FindAllUsersDTO } from './dto/find-all.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
  ) { }

  public async findOne(username: string): Promise<UserDto | undefined> {
    const user = await this.userRepository.findOne(username);
    return user;
  }

  public async create(user: UserDto): Promise<UserDto | undefined> {
    await this.userRepository.save(user);
    return user;
  }

  public async findAll(findAllUsersDTO: FindAllUsersDTO): Promise<UserDto[] | undefined> {
    const users = await this.userRepository.findAll(findAllUsersDTO);
    return users;
  }

  public async update(login: string, updateUserDto: UpdateUserDto): Promise<UserDto | undefined> {
    const user = await this.userRepository.update(login, updateUserDto);
    return user;
  }

  public async delete(login: string): Promise<UserDto | undefined> {
    const user = await this.userRepository.delete(login);
    return user;
  }
}