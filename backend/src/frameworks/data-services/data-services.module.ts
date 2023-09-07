// import { MongoDataServicesModule } from './mongo/mongo-data-services.module';
import Conversation from './mysql/model/conversation.model';
import { Sequelize } from 'sequelize-typescript';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    /* MongoDataServicesModule */
  ],
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
        sequelize.addModels([Conversation]);
        await sequelize.sync({ force: false })
        return sequelize;
      }
    }
  ],
  // exports: [MongoDataServicesModule],
})
export class DataServicesModule { }
