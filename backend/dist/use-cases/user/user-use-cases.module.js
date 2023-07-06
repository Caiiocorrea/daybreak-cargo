"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCasesModule = void 0;
const passengers_provedores_1 = require("../../frameworks/data-services/mysql/passengers.provedores");
const vehicles_provedores_1 = require("../../frameworks/data-services/mysql/vehicles.provedores");
const users_provedores_1 = require("../../frameworks/data-services/mysql/users.provedores");
const auth_use_cases_module_1 = require("../auth/auth-use-cases.module");
const user_use_case_1 = require("./user.use-case");
const common_1 = require("@nestjs/common");
let UserUseCasesModule = class UserUseCasesModule {
};
UserUseCasesModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_use_cases_module_1.AuthUseCasesModule],
        providers: [
            user_use_case_1.UserUseCases,
            ...users_provedores_1.usersProviders,
            ...passengers_provedores_1.passengersProviders,
            ...vehicles_provedores_1.vehiclesProviders
        ],
        exports: [user_use_case_1.UserUseCases],
    })
], UserUseCasesModule);
exports.UserUseCasesModule = UserUseCasesModule;
//# sourceMappingURL=user-use-cases.module.js.map