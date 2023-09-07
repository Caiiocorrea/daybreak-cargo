import { ConversationUseCasesModule } from './use-cases/conversation/order-use-cases.module';
import { DataServicesModule } from './frameworks/data-services/data-services.module';
import { ServiceController } from './controllers/conversations.controller';
import { AppController } from './controllers/app.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConversationUseCasesModule,
    DataServicesModule,
  ],
  controllers: [
    ServiceController,
    AppController,
  ],
  providers: []
})

export class AppModule {}