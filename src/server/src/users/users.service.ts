import { HttpException, Injectable } from '@nestjs/common';
import { FindAllUsersDTO } from './dto/find-all.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UserDto, UserUnsafeDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  public async findOne(login: string): Promise<UserUnsafeDto | undefined> {
    const user = await this.userRepository.findOne(login);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  public async create(user: UserUnsafeDto): Promise<UserDto | undefined> {
    await this.userRepository.save(user);
    return user;
  }

  public async findAll(
    findAllUsersDTO: FindAllUsersDTO,
  ): Promise<UserUnsafeDto[] | undefined> {
    const users = await this.userRepository.findAll(findAllUsersDTO);
    return users;
  }

  public async update(
    login: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto | undefined> {
    const user = await this.userRepository.update(login, updateUserDto);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  public async delete(login: string): Promise<UserDto | undefined> {
    const user = await this.userRepository.delete(login);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  public async changePassword(changePassword: ChangePasswordDto) {
    const user = await this.findOne(changePassword.login);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isOldPasswordCorrect = await bcrypt.compare(
      changePassword.oldPassword,
      user.password,
    );

    if (!isOldPasswordCorrect) {
      throw new HttpException('User not found', 400);
    }

    const newPassword = await bcrypt.hash(changePassword.newPassword, 10);

    user.password = newPassword;

    return this.update(changePassword.login, user);
  }
}
