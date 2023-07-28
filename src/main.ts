import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { responseInterceptor } from './utils/interceptor/http.interceptor';
import { HttpExceptionFilter } from './utils/exeception/http.exeception';
import { AppModule } from './app.module';
import { PrismaService } from './utils/prisma/prisma.service';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      credentials: true,
      origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
    },
  });
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
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
