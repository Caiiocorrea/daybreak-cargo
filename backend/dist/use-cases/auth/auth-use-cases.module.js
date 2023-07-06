"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCasesModule = void 0;
const data_services_module_1 = require("../../frameworks/data-services/data-services.module");
const users_provedores_1 = require("../../frameworks/data-services/mysql/users.provedores");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const auth_use_case_1 = require("./auth.use-case");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthUseCasesModule = class AuthUseCasesModule {
};
AuthUseCasesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            data_services_module_1.DataServicesModule,
            jwt_1.JwtModule.register({
                privateKey: process.env.JWT_SECRET_KEY,
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
            }),
        ],
        providers: [
            auth_use_case_1.AuthUseCases,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            ...users_provedores_1.usersProviders
        ],
        exports: [auth_use_case_1.AuthUseCases, jwt_1.JwtModule],
    })
], AuthUseCasesModule);
exports.AuthUseCasesModule = AuthUseCasesModule;
//# sourceMappingURL=auth-use-cases.module.js.map