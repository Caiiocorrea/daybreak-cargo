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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const dtos_1 = require("../core/dtos");
const jwt_auth_guard_1 = require("../use-cases/auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const JoiValidationPipe_1 = require("../pipes/JoiValidationPipe");
const user_use_case_1 = require("../use-cases/user/user.use-case");
const passport_1 = require("@nestjs/passport");
let UserController = class UserController {
    constructor(userUseCases) {
        this.userUseCases = userUseCases;
    }
    async getAll(query, res) {
        const users = await this.userUseCases.getAllUsers(query, res.locals.user);
        return res.status(200).send(users);
    }
    async createUser(userDto, res) {
        const user = await this.userUseCases.createUser(userDto, res.locals.user);
        return res.status(201).send(user);
    }
    updateUser(userId, updateUserDto, res) {
        const user = this.userUseCases.updateUser(userId, updateUserDto, res.locals.user);
        return res.status(200).send(user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'sobrenome', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'nome', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'email', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: '_id', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'offset', type: Number, required: false }),
    (0, common_1.UsePipes)(new JoiValidationPipe_1.JoiValidationPipe(dtos_1.userSchema)),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('user'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [user_use_case_1.UserUseCases])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map