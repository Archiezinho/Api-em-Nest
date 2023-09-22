import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CatchAllErrors } from './exception-filters/catch-all-errors.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.useGlobalFilters(new CatchAllErrors());
  await app.listen(3000);
}
bootstrap();
