import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from '../../core/dtos';
import { OrderFactoryService } from './order-factory.service';
import { IDataServices } from '../../core/abstracts';
import { OrderEnum } from '../../core/enum/orderEnum';
import { Order, orderResponse } from '../../core';

@Injectable()
export class OrderUseCases {
  constructor(
    private dataServices: IDataServices,
    private OrderFactoryService: OrderFactoryService,
  ) { }

  async getOrder(query: any, user: any): Promise<any> {
    try {
      const order = await this.dataServices.orders.get(query, user);
      if (!order) throw new BadRequestException({ message: OrderEnum.notFound })
      return order;
    } catch (error) {
      throw new BadRequestException({ message: error.message })
    }
  }

  async getAllOrders(query: any, user: any): Promise<orderResponse> {
    try {
      const orders = await this.dataServices.orders.getAll(query.page, query.limit, query, user);
      if (!orders[0]) throw new BadRequestException({ message: OrderEnum.allnotFound })
      return {
        total_restante: Number(await this.dataServices.orders.count()) - Number(query.page ?? 0),
        count: Number(await this.dataServices.orders.count() ?? 0),
        page: Number(query.page ?? 0),
        limit: Number(query.limit ?? 25),
        data: orders
      }
    } catch (error) {
      throw new BadRequestException({ message: error.message })
    }
  }

  async createOrder(createOrderDto: CreateOrderDto, user: any): Promise<Order> {
    try {
      createOrderDto.user_id = user.locals.user.user_id;
      createOrderDto.motorista = `${user.locals.user.nome} ${user.locals.user.sobrenome}`
      const order = this.OrderFactoryService.createNewOrder(createOrderDto);
      return this.dataServices.orders.create(order);
    } catch (error) {
      if (error.code === 11000) throw new BadRequestException({ message: OrderEnum.duplicate })
      throw new InternalServerErrorException({ message: error.message })
    }
  }

  async updateOrder(orderId: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    try {
      const order = this.OrderFactoryService.updateOrder(updateOrderDto);
      return await this.dataServices.orders.update(orderId, order);
    } catch (error) {
      throw new InternalServerErrorException({ message: error.message })
    }
  }
}
