import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post()
  public login(@Body() loginDto: UserDto) {
    return this.authService.login(loginDto);
  }

  @Post()
  public signup(@Body() signupDto: CreateUserDto) {
    return this.authService.signup(signupDto);
  }
}
