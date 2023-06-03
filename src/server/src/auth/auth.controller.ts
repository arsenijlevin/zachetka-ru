import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto, UserUnsafeDto } from '@shared/types/user/user.dto';
import { JWTStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
@ApiTags('Авторизация')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(JWTStrategy)
  @Post("/login")
  public login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JWTStrategy)
  @Post("/signup")
  public signup(@Body() signupDto: UserUnsafeDto): Promise<UserDto> {
    return this.authService.signup(signupDto);
  }
}
