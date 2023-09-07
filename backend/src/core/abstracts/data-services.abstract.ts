import { IGenericRepository } from './generic-repository.abstract';
import { Conversation } from '../entities';

export abstract class IDataServices {
  abstract conversation: IGenericRepository<Conversation>;
}
