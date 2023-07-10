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
const sequelize_typescript_1 = require("sequelize-typescript");
const passengers_model_1 = require("./passengers.model");
const users_model_1 = require("./users.model");
let Order = class Order extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        autoIncrement: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Order.prototype, "user_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "numero_cap", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "centro_custo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "empresa", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "motorista", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "origem", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "destino", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "bloquinho", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "km_inicial", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "km_final", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "valorCorrida", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Order.prototype, "active", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Order.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Order.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.default),
    __metadata("design:type", users_model_1.default)
], Order.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => passengers_model_1.default),
    __metadata("design:type", Array)
], Order.prototype, "passengers", void 0);
Order = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "orders" })
], Order);
exports.default = Order;
//# sourceMappingURL=orders.model.js.map