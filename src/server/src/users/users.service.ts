import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_REPOSITORY')
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
}