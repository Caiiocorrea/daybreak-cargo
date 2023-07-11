import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import Passengers from '../../frameworks/data-services/mysql/model/passengers.model';
import Order from '../../frameworks/data-services/mysql/model/orders.model';
import { CreateOrderDto, UpdateOrderDto } from '../../core/dtos';
import { OrderEnum } from '../../core/enum/orderEnum';
import { WhereOptions, Op } from 'sequelize';
import moment from 'moment';


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
    let newResult: any[] = []
    let origem_destino = [
      "Aracruz",
      "Barra de São Francisco",
      "Barra do Riacho",
      "Barra do Sahy",
      "Bela Vista",
      "Cachoeiro de Itapemirim",
      "Cariacica",
      "Centro",
      "Centro Empresarial",
      "Colatina",
      "Coqueiral de Aracruz",
      "Cupido",
      "Ecoporanga",
      "Fábrica",
      "Fatima",
      "Guanabara",
      "Guaraná",
      "Guaxindiba",
      "Itaparica",
      "Itaputera",
      "Iúna",
      "Jacupemba",
      "Jardins",
      "Jequitibá",
      "Limão",
      "Linhares",
      "Mar Azul",
      "Morobá",
      "Nova Colatina",
      "Nova Conquista",
      "Novo Jequitibá",
      "Planalto",
      "Polivalente",
      "Pontal do Piraqueaçu",
      "Praia Formosa",
      "Praia dos Padres",
      "Primavera",
      "Putiri",
      "Recanto Feliz",
      "Santa Cruz",
      "Santa Luzia",
      "Santa Marta",
      "Sauaçu",
      "Saue",
      "Segato",
      "Serra",
      "São Clemente",
      "São Francisco",
      "São José",
      "São Marcos",
      "Viana",
      "Vila Nova",
      "Vila Rica",
      "Vila Velha",
      "Vila do Riacho",
      "Vitória",
      "de Carli"
    ]

    delete query.offset;
    delete query.limit;


    const result = await this.orderRepository.findAndCountAll({
      where: {
        ...query,
        user_id: user.user_id,
        active: true
      },
      offset, limit,
      order: [
        ['data_viagem', 'DESC'],
        ['hora_viagem', 'DESC'],
        ['created_at', 'DESC']
      ],
      include: [{ model: this.passengersRepository }],
    })

    if (!result) {
      throw new BadRequestException({ message: OrderEnum.notFound })
    }

    return {
      count: result.count - 1 ?? 0,
      offset,
      limit,
      data: result.rows.map((order) => {
        newResult.push({
          ...order.dataValues,
          numero_cap: order.numero_cap ?? "",
          centro_custo: order.centro_custo ?? "",
          intinerario: `${order.origem} x ${order.destino}`,
          valorCorrida: order.valorCorrida ? `R$ ${parseFloat(order.valorCorrida).toFixed(2)}` : 'R$ 0,00',
          img: `../../../../../../assets/img/${order.empresa}.png`,
          hora: order.hora_viagem ? order.hora_viagem.split(':').slice(0, 1).join(':') : '',
          minuto: order.hora_viagem ? order.hora_viagem.split(':').slice(1, 2).join(':') : '',
        })

        return newResult ?? []
      })
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

  async deleteOrder(orderId: any, user: any) {
    try {
      return await this.orderRepository.update({ active: false }, { where: { id: orderId } })
    } catch (error) {
      throw new InternalServerErrorException({ message: error.message })
    }
  }
}
