import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController, UserController, OrderController } from './controllers/_index';
import { DataServicesModule } from './frameworks/data-services/data-services.module';
// import { ReportUseCasesModule } from './use-cases/report/report-use-cases.module';
// import { OrderUseCasesModule } from './use-cases/order/order-use-cases.module';
import { AuthUseCasesModule } from './use-cases/auth/auth-use-cases.module';
// import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { LoggingMiddleware } from './Middleware/logging.middleware';
import { ReportController } from './controllers/report.controller';
import { ServiceController } from './controllers/service.motoboxe.controller';
import { ConversationUseCasesModule } from './use-cases/conversation/order-use-cases.module';

@Module({
  imports: [
    // ReportUseCasesModule,
    // OrderUseCasesModule,
    ConversationUseCasesModule,
    AuthUseCasesModule,
    DataServicesModule,
    // UserUseCasesModule,
  ],
  controllers: [
    ServiceController,
    // ReportController,
    // OrderController,
    // UserController,
    // AppController,
  ],
  providers: []
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .exclude({ path: 'api/v1/taskbotmaster/whatsapp', method: RequestMethod.POST })
      .forRoutes(ServiceController);
  }
}