import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { AuthGuard } from 'src/guards/jwt-guard';

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

  @UseGuards(AuthGuard)
  @Get()
  findOne(@Body('userId') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(@Body('userId') id: string, @Body() data: UpdateUserDto) {
    if(data.password){
      const passwordHash = await hash(data.password, 10);
      data.passwordHash = passwordHash;
      delete data.password;
    }
    delete data.userId;
    return this.userService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete()
  remove(@Body('userId') id: string) {
    return this.userService.remove(id);
  }
}
