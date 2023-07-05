import { CreateOrderDto, UpdateOrderDto } from 'src/core/dtos/order.dto';
import { Order } from '../../core/entities';
export declare class OrderFactoryService {
    createNewOrder(createOrderDto: CreateOrderDto): Order;
    updateOrder(updateOrderDto: UpdateOrderDto): Order;
}
