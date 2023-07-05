import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const packageJson = require("../package.json");
  app.setGlobalPrefix('api/v1/');
  const config = new DocumentBuilder()
    .setTitle('Daybreak Cargo')
    .setDescription(packageJson.description)
    .setTermsOfService('https://www.daybreaksoftware.com.br')
    .setContact(packageJson.author, 'https://www.daybreaksoftware.com.br/', 'softwaredaybreak@gmail.com')
    .setVersion(packageJson.version)
    .addBearerAuth({
      description: `[apenas texto] Insira o token no seguinte formato: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    }, 'access-token')
    .addTag('status')
    .addTag('auth')
    .addTag('report')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.enableCors({ allowedHeaders: '*', origin: '*', credentials: true });
  app.listen(process.env.PORT || 3000);
}
bootstrap();