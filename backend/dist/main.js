"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const packageJson = require("../package.json");
    app.setGlobalPrefix('api/v1/');
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('documentation', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.enableCors({ allowedHeaders: '*', origin: '*', credentials: true });
    app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map