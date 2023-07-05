import { DataServicesModule } from '../../services/data-services/data-services.module';
import { OrderFactoryService } from './order-factory.service';
import { OrderUseCases } from './order.use-case';
import { Module } from '@nestjs/common';

@Module({
  imports: [DataServicesModule],
  providers: [OrderFactoryService, OrderUseCases],
  exports: [OrderFactoryService, OrderUseCases],
})
export class OrderUseCasesModule {}
