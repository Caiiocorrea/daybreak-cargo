import Passengers from '../../frameworks/data-services/mysql/model/passengers.model';
import Order from '../../frameworks/data-services/mysql/model/orders.model';
import { GoogleSpreadsheet } from 'google-spreadsheet';
export declare class ReporGoogleSheetstUseCases {
    private passengersRepository;
    private orderRepository;
    constructor(passengersRepository: typeof Passengers, orderRepository: typeof Order);
    parsePassageiro(passageiros: any): string;
    prepareNameMonth(month: number): string;
    getDoc(user: any): Promise<GoogleSpreadsheet>;
    reportGoogleSheets(user: any): Promise<any>;
    downloadAsXLSX(): Promise<{
        url: string;
        filePath: string;
    }>;
}
