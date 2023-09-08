"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataServicesModule = void 0;
const conversation_model_1 = __importDefault(require("./mysql/model/conversation.model"));
const declaration_model_1 = __importDefault(require("./mysql/model/declaration.model"));
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
let DataServicesModule = class DataServicesModule {
};
DataServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
        ],
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
                    sequelize.addModels([conversation_model_1.default, declaration_model_1.default]);
                    await sequelize.sync({ force: false });
                    return sequelize;
                }
            }
        ],
    })
], DataServicesModule);
exports.DataServicesModule = DataServicesModule;
//# sourceMappingURL=data-services.module.js.map