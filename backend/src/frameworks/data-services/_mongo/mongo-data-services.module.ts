// import { MongoDataServices } from './mongo-data-services.service';
// import { Order, OrderSchema, User, UserSchema, Vehicle, VehicleSchema } from './model';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';
// import { IDataServices } from '../../../core';
// import { Module } from '@nestjs/common';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     MongooseModule.forFeature([
//       { name: User.name, schema: UserSchema },
//       { name: Order.name, schema: OrderSchema },
//       { name: Vehicle.name, schema: VehicleSchema },
//     ]),
//     MongooseModule.forRoot(process.env.CLEAN_NEST_MONGO_CONNECTION_STRING),
//   ],
//   providers: [
//     {
//       provide: IDataServices,
//       useClass: MongoDataServices,
//     },
//   ],
//   exports: [IDataServices],
// })
// export class MongoDataServicesModule { }