import { IGenericRepository } from './generic-repository.abstract';
import { Conversation } from '../entities/conversation.entity';
export declare abstract class IDataServices {
    abstract conversation: IGenericRepository<Conversation>;
}
