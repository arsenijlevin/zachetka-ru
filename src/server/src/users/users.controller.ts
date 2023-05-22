import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersDTO } from './dto/find-all.dto';

@Controller('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Body() findAllUsersDTO: FindAllUsersDTO) {
    return this.usersService.findAll(findAllUsersDTO);
  }

  @Get(':login')
  findOne(@Param('login') login: string) {
    return this.usersService.findOne({
      login: login
    });
  }

  @Patch(':login')
  update(@Param('login') login: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({
      where: {
        login: login
      },
      data: updateUserDto
    });
  }

  @Delete(':login')
  remove(@Param('login') login: string) {
    return this.usersService.delete({
      login: login
    });
  }
}
