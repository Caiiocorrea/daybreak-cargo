import Passengers from '../../frameworks/data-services/mysql/model/passengers.model';
import Order from '../../frameworks/data-services/mysql/model/orders.model';
import { CreateOrderDto, UpdateOrderDto } from '../../core/dtos';
export declare class OrderUseCases {
    private passengersRepository;
    private orderRepository;
    constructor(passengersRepository: typeof Passengers, orderRepository: typeof Order);
    getOrder(searchObject: any, user: any): Promise<{
        count: number;
        offset: number;
        limit: number;
        data: Order[];
    }>;
    getAllOrders(query: any, user: any): Promise<{
        count: number;
        offset: number;
        limit: number;
        data: any[][];
    }>;
    createOrder(createOrderDto: CreateOrderDto, user: any): Promise<void>;
    updateOrder(orderId: any, updateOrderDto: UpdateOrderDto, user: any): Promise<void>;
    deleteOrder(orderId: any, user: any): Promise<[affectedCount: number]>;
    alterOrderStatus(orderId: any, body: any, user: any): Promise<[affectedCount: number]>;
}
