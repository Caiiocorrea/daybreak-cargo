"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const data_services_module_1 = require("./frameworks/data-services/data-services.module");
const auth_use_cases_module_1 = require("./use-cases/auth/auth-use-cases.module");
const logging_middleware_1 = require("./Middleware/logging.middleware");
const service_motoboxe_controller_1 = require("./controllers/service.motoboxe.controller");
const order_use_cases_module_1 = require("./use-cases/conversation/order-use-cases.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logging_middleware_1.LoggingMiddleware)
            .exclude({ path: 'api/v1/taskbotmaster/whatsapp', method: common_1.RequestMethod.POST })
            .forRoutes(service_motoboxe_controller_1.ServiceController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            order_use_cases_module_1.ConversationUseCasesModule,
            auth_use_cases_module_1.AuthUseCasesModule,
            data_services_module_1.DataServicesModule,
        ],
        controllers: [
            service_motoboxe_controller_1.ServiceController,
        ],
        providers: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map