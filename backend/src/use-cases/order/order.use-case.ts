import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import Passengers from '../../frameworks/data-services/mysql/model/passengers.model';
import Order from '../../frameworks/data-services/mysql/model/orders.model';
import { CreateOrderDto, UpdateOrderDto } from '../../core/dtos';
import { OrderEnum } from '../../core/enum/orderEnum';
import { WhereOptions, Op } from 'sequelize';


@Injectable()
export class OrderUseCases {
  constructor(
    @Inject('PASSENGERS_REPOSITORY') private passengersRepository: typeof Passengers,
    @Inject('ORDERS_REPOSITORY') private orderRepository: typeof Order,
  ) { }

  async getOrder(searchObject: any, user: any) {
    const result = await this.orderRepository.findAndCountAll({
      where: {
        numero_cap: searchObject.search,
        user_id: user.user_id,
      },
      include: [{ model: this.passengersRepository }],
    });

    return {
      count: result.count - 1 ?? 0,
      offset: 0,
      limit: 100,
      data: result.rows ?? []
    };
  }

  async getAllOrders(query: any, user: any) {
    let offset: number = Number(query.offset ?? 0);
    let limit: number = Number(query.limit ?? 25);
    delete query.offset;
    delete query.limit;

    const result = await this.orderRepository.findAndCountAll({
      where: {
        ...query,
        user_id: user.user_id,
        active: true
      },
      offset, limit,
      order: [['created_at', 'DESC']],
      include: [{ model: this.passengersRepository }],
    })

    if (!result) {
      throw new BadRequestException({ message: OrderEnum.notFound })
    }

    return {
      count: result.count - 1 ?? 0,
      offset,
      limit,
      data: result.rows ?? []
    };
  }

  async createOrder(createOrderDto: CreateOrderDto, user: any) {
    try {
      createOrderDto.user_id = user.user_id;
      createOrderDto.motorista = user.nome + ' ' + user.sobrenome;
      return await this.orderRepository.create(createOrderDto).then(async (order) => {
        createOrderDto.passageiros.map(async (passenger) => {
          passenger.order_id = order.id;
          await this.passengersRepository.create(passenger)
        })
      }).catch((error) => { throw error })
    } catch (error) {
      throw new InternalServerErrorException({ message: error.message })
    }
  }

  async updateOrder(orderId: any, updateOrderDto: UpdateOrderDto, user: any) {
    try {
      return await this.orderRepository.update(updateOrderDto, { where: { id: orderId } })
        .then(async (order) => {
          updateOrderDto.passageiros.map(async (passenger: any) => {
            await this.passengersRepository.update(passenger, { where: { id: passenger.id } })
          })
        }).catch((error) => { throw error })
    } catch (error) {
      throw new InternalServerErrorException({ message: error.message })
    }
  }
}
