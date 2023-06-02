import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from '@shared/types/user/user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  public async validateUser(username: string, pass: string): Promise<UserDto | null> {
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

  public async login(user: LoginDto) {
    const payload = { username: user.login, sub: user.password };
    console.log(payload);

    const validUser = await this.validateUser(user.login, user.password);

    if (!validUser) throw new HttpException("Invalid login or password", HttpStatus.BAD_REQUEST);

    return {
      token: this.jwtService.sign(payload, {
        privateKey: process.env.JWT_PRIVATE_KEY,
        expiresIn: '6000s'
      }),
    };
  }

  public async signup(userDto: CreateUserDto): Promise<UserDto> {
    const user = await this.usersService.findOne(userDto.login);
    if (user) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(userDto.password, saltOrRounds);

    userDto.password = hash;

    const newSafeUser = await this.usersService.create(userDto);

    return newSafeUser;
  }
}