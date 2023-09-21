import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({tll: 600, isGlobal: true}),ScheduleModule.forRoot(),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
