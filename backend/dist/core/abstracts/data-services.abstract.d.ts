import { IGenericRepository } from './generic-repository.abstract';
import { Vehicle } from '../entities/vehicle.entity';
import { Order, User } from '../entities';
export declare abstract class IDataServices {
    abstract users: IGenericRepository<User>;
    abstract orders: IGenericRepository<Order>;
    abstract vehicles: IGenericRepository<Vehicle>;
}
