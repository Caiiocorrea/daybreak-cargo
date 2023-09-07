import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const packageJson = require("../package.json");
  app.setGlobalPrefix('api/v1/');
  const config = new DocumentBuilder()
    .setTitle('TaskBotMaster')
    .setDescription(packageJson.description)
    .setTermsOfService('https://www.taskbotmaster.com.br')
    .setContact(packageJson.author, 'https://www.taskbotmaster.com.br/', 'taskbotmaster@email.com')
    .setVersion(packageJson.version)
    .addBearerAuth({
      description: `[apenas texto] Insira o token no seguinte formato: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    }, 'access-token')
    .addTag('service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.enableCors({ allowedHeaders: '*', origin: '*', credentials: true });
  app.listen(process.env.PORT || 3000);
}
bootstrap();