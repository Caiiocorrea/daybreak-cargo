import { OrderUseCases } from 'src/use-cases/order/order.use-case';
import { CreateOrderDto, UpdateOrderDto } from '../core/dtos';
export declare class OrderController {
    private orderUseCases;
    constructor(orderUseCases: OrderUseCases);
    createOrder(orderDto: CreateOrderDto, res: any): Promise<any>;
    getAll(query: any, res: any): Promise<any>;
    getOrder(query: any, res: any): Promise<any>;
    updateOrder(orderId: string, updateOrderDto: UpdateOrderDto, res: any): Promise<any>;
}
