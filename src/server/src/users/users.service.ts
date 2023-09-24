import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UserDto, UserUnsafeDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  public async add(user: UserUnsafeDto): Promise<UserDto | null> {
    const passwordHash = await bcrypt.hash(user.password, 10);

    user.password = passwordHash;

    await this.userRepository.save(user);

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

  public async findOne(login: string): Promise<UserUnsafeDto | null> {
    const user = await this.userRepository.findOne(login);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  private async update(
    login: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto | null> {
    const user = await this.userRepository.update(login, updateUserDto);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }
}
