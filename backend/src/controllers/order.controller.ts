import { Controller, Get, Param, Post, Body, Put, UseGuards, Query, Res, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../use-cases/auth/guards/jwt-auth.guard';
import { OrderUseCases } from '../use-cases/order/order.use-case';
import { CreateOrderDto, UpdateOrderDto } from '../core/dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderEnum } from '../core/enum/orderEnum';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
@ApiTags('order')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), JwtAuthGuard)
export class OrderController {
  constructor(
    private orderUseCases: OrderUseCases
  ) { }

  @Post()
  async createOrder(
    @Body() orderDto: CreateOrderDto,
    @Res() res: any
  ) {
    await this.orderUseCases.createOrder(orderDto, res.locals.user);
    return res.status(201).send({ message: OrderEnum.created });
  }

  @Get()
  async getAll(
    @Query() query: any,
    @Res() res: any
  ) {
    const orders = await this.orderUseCases.getAllOrders(query, res.locals.user);
    return res.status(200).send(orders);
  }

  @Get('/search')
  async getOrder(
    @Query() query: any,
    @Res() res: any
  ) {
    const orders = await this.orderUseCases.getOrder(query, res.locals.user);
    return res.status(200).send(orders);
  }

  @Put('/:id')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Res () res: any
  ) {
    const order = await this.orderUseCases.updateOrder(orderId, updateOrderDto, res.locals.user);
    return res.status(201).send({ message: OrderEnum.updated });
  }

  @Delete('/:id')
  async deleteOrder(
    @Param('id') orderId: string,
    @Res () res: any
  ) {
    const order = await this.orderUseCases.deleteOrder(orderId, res.locals.user);
    return res.status(201).send({ message: OrderEnum.deleted });
  }
}