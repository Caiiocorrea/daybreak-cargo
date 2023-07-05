"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderUseCases = void 0;
const common_1 = require("@nestjs/common");
const order_factory_service_1 = require("./order-factory.service");
const abstracts_1 = require("../../core/abstracts");
const orderEnum_1 = require("../../core/enum/orderEnum");
let OrderUseCases = class OrderUseCases {
    constructor(dataServices, OrderFactoryService) {
        this.dataServices = dataServices;
        this.OrderFactoryService = OrderFactoryService;
    }
    async getOrder(query, user) {
        try {
            const order = await this.dataServices.orders.get(query, user);
            if (!order)
                throw new common_1.BadRequestException({ message: orderEnum_1.OrderEnum.notFound });
            return order;
        }
        catch (error) {
            throw new common_1.BadRequestException({ message: error.message });
        }
    }
    async getAllOrders(query, user) {
        var _a, _b, _c, _d;
        try {
            const orders = await this.dataServices.orders.getAll(query.page, query.limit, query, user);
            if (!orders[0])
                throw new common_1.BadRequestException({ message: orderEnum_1.OrderEnum.allnotFound });
            return {
                total_restante: Number(await this.dataServices.orders.count()) - Number((_a = query.page) !== null && _a !== void 0 ? _a : 0),
                count: Number((_b = await this.dataServices.orders.count()) !== null && _b !== void 0 ? _b : 0),
                page: Number((_c = query.page) !== null && _c !== void 0 ? _c : 0),
                limit: Number((_d = query.limit) !== null && _d !== void 0 ? _d : 25),
                data: orders
            };
        }
        catch (error) {
            throw new common_1.BadRequestException({ message: error.message });
        }
    }
    async createOrder(createOrderDto, user) {
        try {
            createOrderDto.user_id = user.locals.user.user_id;
            createOrderDto.motorista = `${user.locals.user.nome} ${user.locals.user.sobrenome}`;
            const order = this.OrderFactoryService.createNewOrder(createOrderDto);
            return this.dataServices.orders.create(order);
        }
        catch (error) {
            if (error.code === 11000)
                throw new common_1.BadRequestException({ message: orderEnum_1.OrderEnum.duplicate });
            throw new common_1.InternalServerErrorException({ message: error.message });
        }
    }
    async updateOrder(orderId, updateOrderDto) {
        try {
            const order = this.OrderFactoryService.updateOrder(updateOrderDto);
            return await this.dataServices.orders.update(orderId, order);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ message: error.message });
        }
    }
};
OrderUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [abstracts_1.IDataServices,
        order_factory_service_1.OrderFactoryService])
], OrderUseCases);
exports.OrderUseCases = OrderUseCases;
//# sourceMappingURL=order.use-case.js.map