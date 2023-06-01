import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

export interface AuthUser {
  login: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(login: string, pass: string) {
    const user = await this.usersService.findOne({ login });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload: AuthUser = { login: user.login, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}