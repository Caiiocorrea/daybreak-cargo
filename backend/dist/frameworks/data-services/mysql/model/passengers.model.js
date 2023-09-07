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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const orders_model_1 = require("./orders.model");
let Passengers = class Passengers extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        autoIncrement: false,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", Number)
], Passengers.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => orders_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Passengers.prototype, "order_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Passengers.prototype, "nome", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Passengers.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Passengers.prototype, "active", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Passengers.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Passengers.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => orders_model_1.default),
    __metadata("design:type", typeof (_a = typeof orders_model_1.default !== "undefined" && orders_model_1.default) === "function" ? _a : Object)
], Passengers.prototype, "order", void 0);
Passengers = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "passengers" })
], Passengers);
exports.default = Passengers;
//# sourceMappingURL=passengers.model.js.map