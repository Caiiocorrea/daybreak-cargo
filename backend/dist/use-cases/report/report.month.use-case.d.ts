import { IDataServices } from '../../core/abstracts';
import { Order } from '../../core';
export declare class ReportMonthUseCases {
    private dataServices;
    constructor(dataServices: IDataServices);
    reportDefaulth(dados: Order[]): Promise<void>;
    reportMonth(query: any, user: any): Promise<any>;
}
