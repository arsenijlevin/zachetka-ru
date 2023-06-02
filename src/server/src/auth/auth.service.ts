import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto, UserSafeDto } from '../users/dto/user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  public async validateUser(username: string, pass: string): Promise<UserSafeDto | null> {
    const user = await this.usersService.findOne(username);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        return null;
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public login(user: UserDto) {
    const payload = { username: user.name, sub: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  public async signup(userDto: CreateUserDto): Promise<UserSafeDto> {
    const user = await this.usersService.findOne(userDto.login);
    if (user) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(userDto.password, saltOrRounds);

    userDto.password = hash;

    const { password, ...newUser } = await this.usersService.create(userDto);
    return newUser;
  }
}