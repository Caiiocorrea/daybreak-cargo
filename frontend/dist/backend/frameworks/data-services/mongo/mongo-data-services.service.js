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
exports.MongoDataServices = void 0;
const common_1 = require("@nestjs/common");
const mongo_generic_repository_1 = require("./mongo-generic-repository");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const model_1 = require("./model");
let MongoDataServices = class MongoDataServices {
    constructor(UserRepository, OrderRepository, VehicleRepository) {
        this.UserRepository = UserRepository;
        this.OrderRepository = OrderRepository;
        this.VehicleRepository = VehicleRepository;
    }
    onApplicationBootstrap() {
        this.users = new mongo_generic_repository_1.MongoGenericRepository(this.UserRepository);
        this.orders = new mongo_generic_repository_1.MongoGenericRepository(this.OrderRepository);
        this.vehicles = new mongo_generic_repository_1.MongoGenericRepository(this.VehicleRepository);
    }
};
MongoDataServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(model_1.Order.name)),
    __param(2, (0, mongoose_1.InjectModel)(model_1.Vehicle.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], MongoDataServices);
exports.MongoDataServices = MongoDataServices;
//# sourceMappingURL=mongo-data-services.service.js.map