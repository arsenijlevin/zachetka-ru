import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalStrategy } from './strategies/local.strategy';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalStrategy)
  @Post("/login")
  public login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(LocalStrategy)
  @Post("/signup")
  public signup(@Body() signupDto: CreateUserDto) {
    return this.authService.signup(signupDto);
  }
}
