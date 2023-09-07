import { conversationProviders } from '../../frameworks/data-services/mysql/conversation.provedores';
import { passengersProviders } from '../../frameworks/data-services/mysql/passengers.provedores';
import { DataServicesModule } from '../../frameworks/data-services/data-services.module';
import { ConversationUseCases } from './conversation.use-case';
import { Module } from '@nestjs/common';

@Module({
  imports: [DataServicesModule],
  providers: [
    ConversationUseCases,
    ...conversationProviders,
  ],
  exports: [ConversationUseCases],
})
export class ConversationUseCasesModule { }
