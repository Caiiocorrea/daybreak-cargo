import { ReporGoogleSheetstUseCases } from '../use-cases/report/report.google.sheets.use-case';
import { ReportMonthUseCases } from '../use-cases/report/report.month.use-case';
export declare class ReportController {
    private reportMonthUseCases;
    private reporGoogleSheetstUseCases;
    constructor(reportMonthUseCases: ReportMonthUseCases, reporGoogleSheetstUseCases: ReporGoogleSheetstUseCases);
    reportMonth(query: any, user: any): Promise<any>;
    reportSheets(res: any): Promise<any>;
    downloadAsXLSX(res: any): Promise<any>;
}
