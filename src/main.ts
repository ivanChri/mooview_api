import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { responseInterceptor } from './utils/interceptor/http.interceptor';
import { HttpExceptionFilter } from './utils/exeception/http.exeception';
import { AppModule } from './app.module';
import { PrismaService } from './utils/prisma/prisma.service';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  app.useGlobalInterceptors(new responseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
