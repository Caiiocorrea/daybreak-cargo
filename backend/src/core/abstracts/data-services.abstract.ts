import { IGenericRepository } from './generic-repository.abstract';
import { Conversation } from '../entities/conversation.entity';

export abstract class IDataServices {
  abstract conversation: IGenericRepository<Conversation>;
}
