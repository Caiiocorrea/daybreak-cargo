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
exports.AppController = void 0;
const auth_use_case_1 = require("..//use-cases/auth/auth.use-case");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../core/dtos");
let AppController = class AppController {
    constructor(authService) {
        this.authService = authService;
    }
    getHello() {
        return { message: 'Daybreak Cargo executando com sucesso.' };
    }
    async signIn(user) {
        return await this.authService.signIn(user.email, user.senha);
    }
};
__decorate([
    (0, common_1.Get)('status'),
    (0, swagger_1.ApiTags)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiTags)('auth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signIn", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_use_case_1.AuthUseCases])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map