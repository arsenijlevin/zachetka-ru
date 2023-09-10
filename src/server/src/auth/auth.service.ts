import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto, UserUnsafeDto } from '../users/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async validateUser(
    login: string,
    pass: string,
  ): Promise<UserDto | null> {
    const user = await this.usersService.findOne(login);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        return null;
      }
      return {
        login: user.login,
        rights_id: user.rights_id,
        name: user.name
      };
    }
    return null;
  }

  public async login(user: LoginDto) {
    const validUser = await this.validateUser(user.login, user.password);

    if (!validUser)
      throw new HttpException(
        'Invalid login or password',
        HttpStatus.BAD_REQUEST,
      );

    const userFromDatabase = await this.usersService.findOne(user.login);

    if (!userFromDatabase) return;

    const payload: UserDto = {
      login: userFromDatabase.login,
      rights_id: userFromDatabase.rights_id,
      name: userFromDatabase.name,
    };

    return {
      token: this.jwtService.sign(payload, {
        privateKey: this.configService.get('JWT_SECRET'),
        expiresIn: '6000s',
      }),
    };
  }

  public async signup(userDto: UserUnsafeDto): Promise<UserDto | null> {
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
