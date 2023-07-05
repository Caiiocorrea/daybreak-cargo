import { DataServicesModule } from '../../services/data-services/data-services.module';
import { ReporGoogleSheetstUseCases } from './report.google.sheets.use-case';
import { ReportMonthUseCases } from './report.month.use-case';
import { Module } from '@nestjs/common';

@Module({
  imports: [DataServicesModule],
  providers: [ReportMonthUseCases, ReporGoogleSheetstUseCases],
  exports: [ReportMonthUseCases, ReporGoogleSheetstUseCases],
})
export class ReportUseCasesModule { }
