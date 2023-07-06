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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderUseCases = void 0;
const common_1 = require("@nestjs/common");
const orderEnum_1 = require("../../core/enum/orderEnum");
const sequelize_1 = require("sequelize");
let OrderUseCases = class OrderUseCases {
    constructor(passengersRepository, orderRepository) {
        this.passengersRepository = passengersRepository;
        this.orderRepository = orderRepository;
    }
    async getOrder(searchObject, user) {
        const fields = Object.keys(this.orderRepository.rawAttributes);
        console.log(fields);
        fields.forEach((field) => {
            if (searchObject[field] === '') {
                delete searchObject[field];
            }
        });
        const whereCondition = {};
        for (const field in searchObject) {
            if (fields.includes(field)) {
                whereCondition[field] = {
                    [sequelize_1.Op.like]: `%${searchObject[field]}%`,
                };
            }
        }
        console.log(whereCondition);
        return this.orderRepository.findAll({
            where: {
                [sequelize_1.Op.or]: [whereCondition],
            },
            include: [{ model: this.passengersRepository }],
        });
    }
    async getAllOrders(query, user) {
        var _a, _b, _c, _d;
        let offset = Number((_a = query.offset) !== null && _a !== void 0 ? _a : 0);
        let limit = Number((_b = query.limit) !== null && _b !== void 0 ? _b : 25);
        delete query.offset;
        delete query.limit;
        console.log(query);
        const result = await this.orderRepository.findAndCountAll({
            where: query,
            offset, limit,
            include: [{ model: this.passengersRepository }],
        });
        if (!result) {
            throw new common_1.BadRequestException({ message: orderEnum_1.OrderEnum.notFound });
        }
        return {
            count: (_c = result.count - 1) !== null && _c !== void 0 ? _c : 0,
            offset,
            limit,
            data: (_d = result.rows) !== null && _d !== void 0 ? _d : []
        };
    }
    async createOrder(createOrderDto, user) {
        try {
            createOrderDto.user_id = user.user_id;
            createOrderDto.motorista = `${user.nome} ${user.sobrenome}`;
            return await this.orderRepository.create(createOrderDto[0]).then(async (order) => {
                createOrderDto.passageiros.map(async (passenger) => {
                    passenger.order_id = order.id;
                    await this.passengersRepository.create(passenger);
                });
            }).catch((error) => { throw error; });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ message: error.message });
        }
    }
    async updateOrder(orderId, updateOrderDto, user) {
        try {
            return await this.orderRepository.update(updateOrderDto, { where: { id: orderId } })
                .then(async (order) => {
                updateOrderDto.passageiros.map(async (passenger) => {
                    await this.passengersRepository.update(passenger, { where: { id: passenger.id } });
                });
            }).catch((error) => { throw error; });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ message: error.message });
        }
    }
};
OrderUseCases = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PASSENGERS_REPOSITORY')),
    __param(1, (0, common_1.Inject)('ORDERS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object])
], OrderUseCases);
exports.OrderUseCases = OrderUseCases;
//# sourceMappingURL=order.use-case.js.map