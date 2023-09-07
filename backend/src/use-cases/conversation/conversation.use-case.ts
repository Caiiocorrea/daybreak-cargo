import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import Passengers from '../../frameworks/data-services/mysql/model/passengers.model';
import Order from '../../frameworks/data-services/mysql/model/orders.model';
import { CreateOrderDto, UpdateOrderDto } from '../../core/dtos';
import { OrderEnum } from '../../core/enum/orderEnum';
import { Sequelize, Op } from 'sequelize';


@Injectable()
export class ConversationUseCases {
  constructor(
    // @Inject('PASSENGERS_REPOSITORY') private passengersRepository: typeof Passengers,
    // @Inject('ORDERS_REPOSITORY') private orderRepository: typeof Order,
  ) { }

  // async getOrder(searchObject: any, user: any) {
  //   console.log({ searchObject, user })
  //   // if (!searchObject.search ||
  //   //   !searchObject.date_one &&
  //   //   !searchObject.date_two
  //   // ) { throw new BadRequestException({ message: OrderEnum.notFound }) }

  //   let consulta: any
  //   if (searchObject.date_one && searchObject.date_two) {
  //     consulta = {
  //       [Op.or]: [
  //         { id: searchObject.search },
  //         { numero_cap: searchObject.search },
  //         { centro_custo: searchObject.search },
  //         { origem: searchObject.search },
  //         { destino: searchObject.search },
  //         { motorista: searchObject.search },
  //         { empresa: searchObject.search },
  //         { status: searchObject.search },
  //         { hora_viagem: searchObject.search },
  //       ],
  //       data_viagem: {
  //         [Op.gte]: searchObject.date_one,
  //         [Op.lte]: searchObject.date_two,
  //       },
  //       user_id: user.user_id,
  //       active: true
  //     }
  //   } else {
  //     consulta = {
  //       [Op.or]: [
  //         { id: searchObject.search },
  //         { numero_cap: searchObject.search },
  //         { centro_custo: searchObject.search },
  //         { origem: searchObject.search },
  //         { destino: searchObject.search },
  //         { motorista: searchObject.search },
  //         { empresa: searchObject.search },
  //         { status: searchObject.search },
  //         { hora_viagem: searchObject.search },
  //       ],
  //       user_id: user.user_id,
  //       active: true
  //     }
  //   }

  //   const result = await this.orderRepository.findAndCountAll({
  //     where: consulta,
  //     include: [{ model: this.passengersRepository }],
  //     logging: console.log
  //   });

  //   return {
  //     count: result.count - 1 ?? 0,
  //     offset: 0,
  //     limit: 100,
  //     data: result.rows ?? []
  //   };
  // }

  // async getAllOrders(query: any, user: any) {
  //   let offset: number = Number(query.offset ?? 0);
  //   let limit: number = Number(query.limit ?? 25);
  //   let newResult: any[] = []

  //   delete query.offset;
  //   delete query.limit;

  //   const result = await this.orderRepository.findAndCountAll({
  //     where: {
  //       ...query,
  //       user_id: user.user_id,
  //       active: true
  //     },
  //     offset, limit,
  //     order: [
  //       ['data_viagem', 'DESC'],
  //       ['hora_viagem', 'DESC'],
  //       ['created_at', 'DESC']
  //     ],
  //     include: [{ model: this.passengersRepository }],
  //   })

  //   if (!result) {
  //     throw new BadRequestException({ message: OrderEnum.notFound })
  //   }

  //   return {
  //     count: result.count - 1 ?? 0,
  //     offset,
  //     limit,
  //     data: result.rows.map((order) => {
  //       newResult.push({
  //         ...order.dataValues,
  //         numero_cap: order.numero_cap ?? "",
  //         centro_custo: order.centro_custo ?? "",
  //         intinerario: `${order.origem} x ${order.destino}`,
  //         valorCorrida: order.valorCorrida ? `R$ ${parseFloat(order.valorCorrida).toFixed(2)}` : 'R$ 0,00',
  //         img: `../../../../../../assets/img/${order.empresa}.png`,
  //         hora: order.hora_viagem ? order.hora_viagem.split(':').slice(0, 1).join(':') : '',
  //         minuto: order.hora_viagem ? order.hora_viagem.split(':').slice(1, 2).join(':') : '',
  //       })

  //       return newResult ?? []
  //     })
  //   };
  // }

  // async createOrder(createOrderDto: CreateOrderDto, user: any) {
  //   try {
  //     createOrderDto.user_id = user.user_id;
  //     createOrderDto.motorista = user.nome + ' ' + user.sobrenome;
  //     return await this.orderRepository.create(createOrderDto).then(async (order) => {
  //       createOrderDto.passageiros.map(async (passenger) => {
  //         passenger.order_id = order.id;
  //         await this.passengersRepository.create(passenger)
  //       })
  //     }).catch((error) => { throw error })
  //   } catch (error) {
  //     throw new InternalServerErrorException({ message: error.message })
  //   }
  // }

  // async updateOrder(orderId: any, updateOrderDto: UpdateOrderDto, user: any) {
  //   try {
  //     return await this.orderRepository.update(updateOrderDto, { where: { id: orderId } })
  //       .then(async () => {
  //         updateOrderDto.passageiros.map(async (passenger: any) => {
  //           if (passenger.id) {
  //             await this.passengersRepository.update(passenger, { where: { id: passenger.id } })
  //           } else {
  //             await this.passengersRepository.create(passenger)
  //           }
  //         })
  //       }).catch((error) => { throw error })
  //   } catch (error) {
  //     throw new InternalServerErrorException({ message: error.message })
  //   }
  // }

  // async deleteOrder(orderId: any, user: any) {
  //   try {
  //     return await this.orderRepository.update({ active: false }, { where: { id: orderId } })
  //   } catch (error) {
  //     throw new InternalServerErrorException({ message: error.message })
  //   }
  // }

  // async alterOrderStatus(orderId: any, body: any, user: any) {
  //   try {
  //     return await this.orderRepository.update({ status: body.status }, { where: { id: orderId } })
  //   } catch (error) {
  //     throw new InternalServerErrorException({ message: error.message })
  //   }
  // }
}
