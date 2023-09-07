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
exports.UpdateOrderDto = exports.CreateOrderDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateOrderDto {
}
__decorate([
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "motorista", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Número CAP deve ser uma string' }),
    (0, swagger_1.ApiProperty)({ description: 'Número CAP do solicitante' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "numero_cap", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Centro de Custo deve ser uma string' }),
    (0, swagger_1.ApiProperty)({ description: 'Centro de Custo do solicitante' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "centro_custo", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Bloquinho deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Bloquinho é obrigatório' }),
    (0, swagger_1.ApiProperty)({ description: 'Quando bloquinho preenchido' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "bloquinho", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "sgs", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Origem deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Origem é obrigatório' }),
    (0, swagger_1.ApiProperty)({ description: 'Local de início da viagem' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "origem", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Destino deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Destino é obrigatório' }),
    (0, swagger_1.ApiProperty)({ description: 'Local de destino da viagem' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "destino", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Empresa deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Empresa é obrigatório' }),
    (0, swagger_1.ApiProperty)({ description: 'Empresa solicitante' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "empresa", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Km Inicial deve ser uma string' }),
    (0, swagger_1.ApiProperty)({ description: 'Km ao iniciar corrida' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "km_inicial", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Km Final deve ser uma string' }),
    (0, swagger_1.ApiProperty)({ description: 'Km ao finalizar corrida' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "km_final", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Valor deve ser uma string' }),
    (0, swagger_1.ApiProperty)({ description: 'Valor total da viagem' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "valorCorrida", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Status deve ser uma string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Status é obrigatório' }),
    (0, swagger_1.ApiProperty)({ description: 'Status da viagem' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Passageiros deve ser um array' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Passageiros é obrigatório' }),
    (0, swagger_1.ApiProperty)({ description: 'Passageiros da viagem' }),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "passageiros", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "data_viagem", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "hora_viagem", void 0);
exports.CreateOrderDto = CreateOrderDto;
class UpdateOrderDto {
}
__decorate([
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "motorista", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Número CAP deve ser uma string' }),
    (0, swagger_1.ApiProperty)({ description: 'Número CAP do solicitante' }),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "numero_cap", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Centro de Custo deve ser uma string' }),
    (0, swagger_1.ApiProperty)({ description: 'Centro de Custo do solicitante' }),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "centro_custo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "bloquinho", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "sgs", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "destino", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "origem", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "empresa", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "km_inicial", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "km_final", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "valorCorrida", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], UpdateOrderDto.prototype, "passageiros", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], UpdateOrderDto.prototype, "active", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "data_viagem", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "hora_viagem", void 0);
exports.UpdateOrderDto = UpdateOrderDto;
//# sourceMappingURL=order.dto.js.map