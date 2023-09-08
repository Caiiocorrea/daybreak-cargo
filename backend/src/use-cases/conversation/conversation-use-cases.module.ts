import { conversationProviders } from '../../frameworks/data-services/mysql/conversation.provedores';
import { declarationProviders } from '../../frameworks/data-services/mysql/declaration.provedores';
import { DataServicesModule } from '../../frameworks/data-services/data-services.module';
import { ConversationUseCases } from './conversation.use-case';
import { Module } from '@nestjs/common';

@Module({
  imports: [DataServicesModule],
  providers: [
    ConversationUseCases,
    ...conversationProviders,
    ...declarationProviders
  ],
  exports: [ConversationUseCases],
})
export class ConversationUseCasesModule { }
