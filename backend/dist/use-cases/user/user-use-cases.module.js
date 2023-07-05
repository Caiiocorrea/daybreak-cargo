"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCasesModule = void 0;
const data_services_module_1 = require("../../services/data-services/data-services.module");
const user_factory_service_1 = require("./user-factory.service");
const user_use_case_1 = require("./user.use-case");
const common_1 = require("@nestjs/common");
const auth_use_cases_module_1 = require("../auth/auth-use-cases.module");
let UserUseCasesModule = class UserUseCasesModule {
};
UserUseCasesModule = __decorate([
    (0, common_1.Module)({
        imports: [data_services_module_1.DataServicesModule, auth_use_cases_module_1.AuthUseCasesModule],
        providers: [user_factory_service_1.UserFactoryService, user_use_case_1.UserUseCases],
        exports: [user_factory_service_1.UserFactoryService, user_use_case_1.UserUseCases],
    })
], UserUseCasesModule);
exports.UserUseCasesModule = UserUseCasesModule;
//# sourceMappingURL=user-use-cases.module.js.map