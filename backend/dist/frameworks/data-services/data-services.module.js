"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataServicesModule = void 0;
const mongo_data_services_module_1 = require("./mongo/mongo-data-services.module");
const passengers_model_1 = require("./mysql/model/passengers.model");
const vehicles_model_1 = require("./mysql/model/vehicles.model");
const sequelize_typescript_1 = require("sequelize-typescript");
const orders_model_1 = require("./mysql/model/orders.model");
const users_model_1 = require("./mysql/model/users.model");
const common_1 = require("@nestjs/common");
let DataServicesModule = class DataServicesModule {
};
DataServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [mongo_data_services_module_1.MongoDataServicesModule],
        providers: [
            {
                provide: 'SEQUELIZE',
                useFactory: async () => {
                    const sequelize = new sequelize_typescript_1.Sequelize({
                        dialect: 'mysql',
                        host: process.env.MYSQL_HOST,
                        port: parseInt(process.env.MYSQL_PORT),
                        username: process.env.MYSQL_USER,
                        password: process.env.MYSQL_PASSWORD,
                        database: process.env.MYSQL_DATABASE,
                        logging: false,
                    });
                    sequelize.addModels([users_model_1.default, passengers_model_1.default, vehicles_model_1.default, orders_model_1.default]);
                    await sequelize.sync();
                    return sequelize;
                }
            }
        ],
        exports: [mongo_data_services_module_1.MongoDataServicesModule],
    })
], DataServicesModule);
exports.DataServicesModule = DataServicesModule;
//# sourceMappingURL=data-services.module.js.map