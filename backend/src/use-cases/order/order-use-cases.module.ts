import { passengersProviders } from '../../frameworks/data-services/mysql/passengers.provedores';
import { DataServicesModule } from '../../frameworks/data-services/data-services.module';
import { ordesProviders } from '../../frameworks/data-services/mysql/orders.provedores';
import { OrderUseCases } from './order.use-case';
import { Module } from '@nestjs/common';

@Module({
  imports: [DataServicesModule],
  providers: [
    OrderUseCases,
    ...ordesProviders,
    ...passengersProviders
  ],
  exports: [OrderUseCases],
})
export class OrderUseCasesModule { }
