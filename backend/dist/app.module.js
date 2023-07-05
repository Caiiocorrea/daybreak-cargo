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
const _index_1 = require("./controllers/_index");
const data_services_module_1 = require("./services/data-services/data-services.module");
const report_use_cases_module_1 = require("./use-cases/report/report-use-cases.module");
const order_use_cases_module_1 = require("./use-cases/order/order-use-cases.module");
const auth_use_cases_module_1 = require("./use-cases/auth/auth-use-cases.module");
const user_use_cases_module_1 = require("./use-cases/user/user-use-cases.module");
const logging_middleware_1 = require("./Middleware/logging.middleware");
const report_controller_1 = require("./controllers/report.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logging_middleware_1.LoggingMiddleware)
            .exclude({ path: 'login', method: common_1.RequestMethod.POST })
            .forRoutes(_index_1.UserController, _index_1.OrderController, report_controller_1.ReportController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            report_use_cases_module_1.ReportUseCasesModule,
            order_use_cases_module_1.OrderUseCasesModule,
            auth_use_cases_module_1.AuthUseCasesModule,
            data_services_module_1.DataServicesModule,
            user_use_cases_module_1.UserUseCasesModule,
        ],
        controllers: [
            report_controller_1.ReportController,
            _index_1.OrderController,
            _index_1.UserController,
            _index_1.AppController,
        ],
        providers: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map