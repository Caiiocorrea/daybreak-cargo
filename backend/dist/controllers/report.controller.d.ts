import { ReporGoogleSheetstUseCases } from '../use-cases/report/report.google.sheets.use-case';
export declare class ReportController {
    private reporGoogleSheetstUseCases;
    constructor(reporGoogleSheetstUseCases: ReporGoogleSheetstUseCases);
    reportSheets(res: any): Promise<any>;
}
