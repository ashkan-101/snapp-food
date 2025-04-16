import { INestApplication } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export const swaggerInit = (app: INestApplication): void => {
  const config = new DocumentBuilder()
  .setTitle('snapp-food_API')
  .setVersion('1.0.0')
  .addBearerAuth({
    type: 'http',
    bearerFormat: 'JWT',
    in: 'headers',
    scheme: 'bearer'
  }, 'Authorization')
  .build()

  const swaggerDocument = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api-document', app, swaggerDocument)
}