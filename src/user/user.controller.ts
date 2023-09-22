import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() data: CreateUserDto) {
    const passwordHash = await hash(data.password, 10);
    data.passwordHash = passwordHash;
    delete data.password;
    return this.userService.create(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    if(data.password){
      const passwordHash = await hash(data.password, 10);
      data.passwordHash = passwordHash;
      delete data.password;
    }

    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
