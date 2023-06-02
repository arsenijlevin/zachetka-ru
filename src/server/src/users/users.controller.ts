import { Controller, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { ChangePasswordDto } from '@shared/types/auth/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Patch('update')
  public update(@Param('login') login: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(login, updateUserDto);
  }

  @Delete('remove')
  public remove(@Param('login') login: string) {
    return this.usersService.delete(login);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  public changePassword(@Body() changePassword: ChangePasswordDto) {
    return this.usersService.changePassword(changePassword);
  }
}
