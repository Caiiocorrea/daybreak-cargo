import { ReporGoogleSheetstUseCases } from 'src/use-cases/report/report.google.sheets.use-case';
import { ReportMonthUseCases } from 'src/use-cases/report/report.month.use-case';
import { JwtAuthGuard } from '../use-cases/auth/guards/jwt-auth.guard';
import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('report')
@ApiTags('report')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), JwtAuthGuard)
export class ReportController {
  constructor(
    private reportMonthUseCases: ReportMonthUseCases,
    private reporGoogleSheetstUseCases: ReporGoogleSheetstUseCases
  ) { }

  @Get('/month')
  async reportMonth(@Query() query: any, @Res() user: any) {
    const reportMonh = await this.reportMonthUseCases.reportMonth(query, user);
    return reportMonh
  }

  @Get('/reportsheets')
  async reportSheets(@Res() res: any) {
    const report = await this.reporGoogleSheetstUseCases.reportGoogleSheets(res)
    return res.status(200).send(report);
  }

  @Get('/downloadAsXLSX')
  async downloadAsXLSX(@Res() res: any) {
    const buffer = await this.reporGoogleSheetstUseCases.downloadAsXLSX()
    console.log(buffer)
    return res.status(200).send(buffer);
  }
}