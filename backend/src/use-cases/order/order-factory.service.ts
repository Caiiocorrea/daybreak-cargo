import { CreateOrderDto, UpdateOrderDto } from 'src/core/dtos/order.dto';
import { Injectable } from '@nestjs/common';
import { Order } from '../../core/entities';
import * as moment from 'moment';

@Injectable()
export class OrderFactoryService {
  createNewOrder(createOrderDto: CreateOrderDto) {
    const newOrder = new Order();
    newOrder.user_id = createOrderDto.user_id;
    newOrder.empresa = createOrderDto.empresa;
    newOrder.motorista = createOrderDto.motorista;
    newOrder.origem = createOrderDto.origem;
    newOrder.destino = createOrderDto.destino;
    newOrder.bloquinho = createOrderDto.bloquinho;
    newOrder.kmCorrida = createOrderDto.kmCorrida;
    newOrder.valorCorrida = createOrderDto.valorCorrida;
    newOrder.status = createOrderDto.status;
    newOrder.created_at = `${moment().format("YYYY-MM-DD HH:mm:ss")}`
    newOrder.updated_at = ''
    newOrder.passageiros = createOrderDto.passageiros.map((dados) => {
      return {
        passageiro: dados.passageiro,
        status: dados.status
      }
    })

    return newOrder;
  }


  updateOrder(updateOrderDto: UpdateOrderDto) {
    const newOrder = new Order();
    newOrder.empresa = updateOrderDto.empresa;
    newOrder.motorista = updateOrderDto.motorista;
    newOrder.origem = updateOrderDto.origem;
    newOrder.destino = updateOrderDto.destino;
    newOrder.bloquinho = updateOrderDto.bloquinho;
    newOrder.kmCorrida = updateOrderDto.kmCorrida;
    newOrder.valorCorrida = updateOrderDto.valorCorrida;
    newOrder.status = updateOrderDto.status;
    newOrder.updated_at = `${moment().format("YYYY-MM-DD HH:mm:ss")}`
    newOrder.passageiros = updateOrderDto.passageiros.map((dados) => {
      return {
        passageiro: dados.passageiro,
        status: dados.status
      }
    })

    return newOrder;
  }
}
