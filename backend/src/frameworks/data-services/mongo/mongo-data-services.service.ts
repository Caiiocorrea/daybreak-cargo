import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MongoGenericRepository } from './mongo-generic-repository';
import { InjectModel } from '@nestjs/mongoose';
import { IDataServices } from '../../../core';
import { Model } from 'mongoose';
import {
  Order,
  OrderDocument,
  User,
  UserDocument,
  Vehicle,
  VehicleDocument
} from './model';

@Injectable()
export class MongoDataServices implements IDataServices, OnApplicationBootstrap {
  users: MongoGenericRepository<UserDocument>
  orders: MongoGenericRepository<OrderDocument>
  vehicles: MongoGenericRepository<VehicleDocument>

  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<User>,
    @InjectModel(Order.name)
    private OrderRepository: Model<Order>,
    @InjectModel(Vehicle.name)
    private VehicleRepository: Model<Vehicle>,
  ) { }

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<any>(this.UserRepository);
    this.orders = new MongoGenericRepository<any>(this.OrderRepository);
    this.vehicles = new MongoGenericRepository<any>(this.VehicleRepository);
  }
}