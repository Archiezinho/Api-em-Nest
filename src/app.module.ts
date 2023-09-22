import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CacheModule.register({tll: 600, isGlobal: true}),ScheduleModule.forRoot(), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
