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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../use-cases/auth/guards/jwt-auth.guard");
const order_use_case_1 = require("../use-cases/order/order.use-case");
const dtos_1 = require("../core/dtos");
const swagger_1 = require("@nestjs/swagger");
const orderEnum_1 = require("../core/enum/orderEnum");
const passport_1 = require("@nestjs/passport");
let OrderController = class OrderController {
    constructor(orderUseCases) {
        this.orderUseCases = orderUseCases;
    }
    async createOrder(orderDto, res) {
        await this.orderUseCases.createOrder(orderDto, res.locals.user);
        return res.status(201).send({ message: orderEnum_1.OrderEnum.created });
    }
    async getAll(query, res) {
        const orders = await this.orderUseCases.getAllOrders(query, res.locals.user);
        return res.status(200).send(orders);
    }
    async getOrder(query, res) {
        const orders = await this.orderUseCases.getOrder(query, res.locals.user);
        return res.status(200).send(orders);
    }
    async updateOrder(orderId, updateOrderDto, res) {
        const order = await this.orderUseCases.updateOrder(orderId, updateOrderDto, res.locals.user);
        return res.status(201).send({ message: orderEnum_1.OrderEnum.updated });
    }
    async deleteOrder(orderId, res) {
        const order = await this.orderUseCases.deleteOrder(orderId, res.locals.user);
        return res.status(201).send({ message: orderEnum_1.OrderEnum.deleted });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    (0, swagger_1.ApiTags)('order'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [order_use_case_1.OrderUseCases])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map