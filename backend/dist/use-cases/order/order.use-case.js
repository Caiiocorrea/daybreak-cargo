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
let OrderUseCases = class OrderUseCases {
    constructor(passengersRepository, orderRepository) {
        this.passengersRepository = passengersRepository;
        this.orderRepository = orderRepository;
    }
    async getOrder(searchObject, user) {
        var _a, _b;
        const result = await this.orderRepository.findAndCountAll({
            where: {
                numero_cap: searchObject.search,
                user_id: user.user_id,
            },
            include: [{ model: this.passengersRepository }],
        });
        return {
            count: (_a = result.count - 1) !== null && _a !== void 0 ? _a : 0,
            offset: 0,
            limit: 100,
            data: (_b = result.rows) !== null && _b !== void 0 ? _b : []
        };
    }
    async getAllOrders(query, user) {
        var _a, _b, _c;
        let offset = Number((_a = query.offset) !== null && _a !== void 0 ? _a : 0);
        let limit = Number((_b = query.limit) !== null && _b !== void 0 ? _b : 25);
        let newResult = [];
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
        ];
        delete query.offset;
        delete query.limit;
        const result = await this.orderRepository.findAndCountAll({
            where: Object.assign(Object.assign({}, query), { user_id: user.user_id, active: true }),
            offset, limit,
            order: [
                ['data_viagem', 'DESC'],
                ['hora_viagem', 'DESC'],
                ['created_at', 'DESC']
            ],
            include: [{ model: this.passengersRepository }],
        });
        if (!result) {
            throw new common_1.BadRequestException({ message: orderEnum_1.OrderEnum.notFound });
        }
        return {
            count: (_c = result.count - 1) !== null && _c !== void 0 ? _c : 0,
            offset,
            limit,
            data: result.rows.map((order) => {
                var _a, _b;
                newResult.push(Object.assign(Object.assign({}, order.dataValues), { numero_cap: (_a = order.numero_cap) !== null && _a !== void 0 ? _a : "", centro_custo: (_b = order.centro_custo) !== null && _b !== void 0 ? _b : "", intinerario: `${order.origem} x ${order.destino}`, valorCorrida: order.valorCorrida ? `R$ ${parseFloat(order.valorCorrida).toFixed(2)}` : 'R$ 0,00', img: `../../../../../../assets/img/${order.empresa}.png`, hora: order.hora_viagem ? order.hora_viagem.split(':').slice(0, 1).join(':') : '', minuto: order.hora_viagem ? order.hora_viagem.split(':').slice(1, 2).join(':') : '' }));
                return newResult !== null && newResult !== void 0 ? newResult : [];
            })
        };
    }
    async createOrder(createOrderDto, user) {
        try {
            createOrderDto.user_id = user.user_id;
            createOrderDto.motorista = user.nome + ' ' + user.sobrenome;
            return await this.orderRepository.create(createOrderDto).then(async (order) => {
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
    async deleteOrder(orderId, user) {
        try {
            return await this.orderRepository.update({ active: false }, { where: { id: orderId } });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({ message: error.message });
        }
    }
    async alterOrderStatus(orderId, body, user) {
        try {
            return await this.orderRepository.update({ status: body.status }, { where: { id: orderId } });
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