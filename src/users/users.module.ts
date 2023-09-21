import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/PrismaService';
import { UsersCountService } from './users-count/users-count.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersCountService],
})
export class UsersModule {}
