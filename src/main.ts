import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerInit } from './configs/swagger.config';

const URL = process.env.APP_URL
const PORT = process.env.APP_PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  swaggerInit(app)
  await app.listen(PORT ?? 3000, () => {
    console.log(`server is running on port ${PORT}`);
    console.log(`APi-documents: ${URL}:${PORT}/api-document`);
  });
}
bootstrap();
