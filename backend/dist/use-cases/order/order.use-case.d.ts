import { CreateOrderDto, UpdateOrderDto } from '../../core/dtos';
import { OrderFactoryService } from './order-factory.service';
import { IDataServices } from '../../core/abstracts';
import { Order, orderResponse } from '../../core';
export declare class OrderUseCases {
    private dataServices;
    private OrderFactoryService;
    constructor(dataServices: IDataServices, OrderFactoryService: OrderFactoryService);
    getOrder(query: any, user: any): Promise<any>;
    getAllOrders(query: any, user: any): Promise<orderResponse>;
    createOrder(createOrderDto: CreateOrderDto, user: any): Promise<Order>;
    updateOrder(orderId: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
}
