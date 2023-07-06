import Passengers from '../../frameworks/data-services/mysql/model/passengers.model';
import Order from '../../frameworks/data-services/mysql/model/orders.model';
import { CreateOrderDto, UpdateOrderDto } from '../../core/dtos';
export declare class OrderUseCases {
    private passengersRepository;
    private orderRepository;
    constructor(passengersRepository: typeof Passengers, orderRepository: typeof Order);
    getOrder(searchObject: any, user: any): Promise<Order[]>;
    getAllOrders(query: any, user: any): Promise<{
        count: number;
        offset: number;
        limit: number;
        data: Order[];
    }>;
    createOrder(createOrderDto: CreateOrderDto, user: any): Promise<void>;
    updateOrder(orderId: any, updateOrderDto: UpdateOrderDto, user: any): Promise<void>;
}
