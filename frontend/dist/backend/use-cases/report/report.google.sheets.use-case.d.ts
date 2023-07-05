import { GoogleSpreadsheet } from 'google-spreadsheet';
import { IDataServices } from '../../core/abstracts';
export declare class ReporGoogleSheetstUseCases {
    private dataServices;
    constructor(dataServices: IDataServices);
    parsePassageiro(passageiros: any): string;
    prepareNameMonth(month: number): string;
    getDoc(user: any): Promise<GoogleSpreadsheet>;
    reportGoogleSheets(user: any): Promise<any>;
    downloadAsXLSX(): Promise<{
        url: string;
        filePath: string;
    }>;
}
