import { MongoDataServicesModule } from './mongo/mongo-data-services.module';
import Passengers from './mysql/model/passengers.model';
import Vehicle from './mysql/model/vehicles.model';
import { Sequelize } from 'sequelize-typescript';
import Order from './mysql/model/orders.model';
import User from './mysql/model/users.model';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongoDataServicesModule],
  providers: [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: 'mysql',
          host: process.env.MYSQL_HOST,
          port: parseInt(process.env.MYSQL_PORT),
          username: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
          logging: false,
        });
        sequelize.addModels([User, Passengers, Vehicle, Order]);
        await sequelize.sync();
        return sequelize;
      }
    }
  ],
  exports: [MongoDataServicesModule],
})
export class DataServicesModule { }
