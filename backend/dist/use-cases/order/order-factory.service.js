"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFactoryService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../../core/entities");
const moment = require("moment");
let OrderFactoryService = class OrderFactoryService {
    createNewOrder(createOrderDto) {
        const newOrder = new entities_1.Order();
        newOrder.user_id = createOrderDto.user_id;
        newOrder.empresa = createOrderDto.empresa;
        newOrder.motorista = createOrderDto.motorista;
        newOrder.origem = createOrderDto.origem;
        newOrder.destino = createOrderDto.destino;
        newOrder.bloquinho = createOrderDto.bloquinho;
        newOrder.kmCorrida = createOrderDto.kmCorrida;
        newOrder.valorCorrida = createOrderDto.valorCorrida;
        newOrder.status = createOrderDto.status;
        newOrder.created_at = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
        newOrder.updated_at = '';
        return newOrder;
    }
    updateOrder(updateOrderDto) {
        const newOrder = new entities_1.Order();
        newOrder.empresa = updateOrderDto.empresa;
        newOrder.motorista = updateOrderDto.motorista;
        newOrder.origem = updateOrderDto.origem;
        newOrder.destino = updateOrderDto.destino;
        newOrder.bloquinho = updateOrderDto.bloquinho;
        newOrder.kmCorrida = updateOrderDto.kmCorrida;
        newOrder.valorCorrida = updateOrderDto.valorCorrida;
        newOrder.status = updateOrderDto.status;
        newOrder.updated_at = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
        return newOrder;
    }
};
OrderFactoryService = __decorate([
    (0, common_1.Injectable)()
], OrderFactoryService);
exports.OrderFactoryService = OrderFactoryService;
//# sourceMappingURL=order-factory.service.js.map