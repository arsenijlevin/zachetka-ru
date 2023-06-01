import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersDTO } from './dto/find-all.dto';
import { User } from './entities/user.entity';

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
  async findOne(@Param('login') login: string): Promise<User> {
    const user = await this.usersService.findOne({
      login: login
    });

    return {
      login: user.login,
      name: user.name,
      rights_id: user.rights_id,
      password: user.password
    }
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
