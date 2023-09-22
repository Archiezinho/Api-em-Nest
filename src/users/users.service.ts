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

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });
    if (!user) {
      throw new Error("User dont exists");
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id
      }
    });
    if (!userExists) {
      throw new Error("User dont exists");
    }

    return await this.prisma.user.update({
      data,
      where: {
        id
      }
    });
  }

  async remove(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id
      }
    });
    if (!userExists) {
      throw new Error("User dont exists");
    }

    return await this.prisma.user.update({
      data: {
        active: false
      },
      where: {
        id
      }
    });
  }
}
