import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService){}

  async create(data: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        user: data.user
      }
    });
    if (userExists) {
      throw new Error("User alredy exists");
    }

    const user = await this.prisma.user.create({data});
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, data: UpdateUserDto) {

    return await this.prisma.user.update({
      data,
      where: {
        id
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
