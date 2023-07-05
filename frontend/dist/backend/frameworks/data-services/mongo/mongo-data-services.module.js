"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDataServicesModule = void 0;
const mongo_data_services_service_1 = require("./mongo-data-services.service");
const model_1 = require("./model");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const core_1 = require("../../../core");
const common_1 = require("@nestjs/common");
let MongoDataServicesModule = class MongoDataServicesModule {
};
MongoDataServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forFeature([
                { name: model_1.User.name, schema: model_1.UserSchema },
                { name: model_1.Order.name, schema: model_1.OrderSchema },
                { name: model_1.Vehicle.name, schema: model_1.VehicleSchema },
            ]),
            mongoose_1.MongooseModule.forRoot(process.env.CLEAN_NEST_MONGO_CONNECTION_STRING),
        ],
        providers: [
            {
                provide: core_1.IDataServices,
                useClass: mongo_data_services_service_1.MongoDataServices,
            },
        ],
        exports: [core_1.IDataServices],
    })
], MongoDataServicesModule);
exports.MongoDataServicesModule = MongoDataServicesModule;
//# sourceMappingURL=mongo-data-services.module.js.map