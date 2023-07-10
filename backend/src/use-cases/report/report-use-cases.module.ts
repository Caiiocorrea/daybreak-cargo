import { passengersProviders } from 'src/frameworks/data-services/mysql/passengers.provedores';
import { DataServicesModule } from '../../frameworks/data-services/data-services.module';
import { ordesProviders } from 'src/frameworks/data-services/mysql/orders.provedores';
import { ReporGoogleSheetstUseCases } from './report.google.sheets.use-case';
// import { ReportMonthUseCases } from './report.month.use-case';
import { Module } from '@nestjs/common';

@Module({
  imports: [DataServicesModule],
  providers: [
    // ReportMonthUseCases,
    ReporGoogleSheetstUseCases,
    ...ordesProviders,
    ...passengersProviders
  ],
  exports: [
    // ReportMonthUseCases,
    ReporGoogleSheetstUseCases
  ],
})
export class ReportUseCasesModule { }
