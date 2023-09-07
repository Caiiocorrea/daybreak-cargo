import Conversation from "./model/conversation.model";

export const conversationProviders = [
  {
    provide: 'CONVERSATION_REPOSITORY',
    useValue: Conversation,
  },
];