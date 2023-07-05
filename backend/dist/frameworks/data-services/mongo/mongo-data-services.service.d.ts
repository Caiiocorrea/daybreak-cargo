import { OnApplicationBootstrap } from '@nestjs/common';
import { MongoGenericRepository } from './mongo-generic-repository';
import { IDataServices } from '../../../core';
import { Model } from 'mongoose';
import { Order, OrderDocument, User, UserDocument, Vehicle, VehicleDocument } from './model';
export declare class MongoDataServices implements IDataServices, OnApplicationBootstrap {
    private UserRepository;
    private OrderRepository;
    private VehicleRepository;
    users: MongoGenericRepository<UserDocument>;
    orders: MongoGenericRepository<OrderDocument>;
    vehicles: MongoGenericRepository<VehicleDocument>;
    constructor(UserRepository: Model<User>, OrderRepository: Model<Order>, VehicleRepository: Model<Vehicle>);
    onApplicationBootstrap(): void;
}
