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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCases = void 0;
const exceptions_1 = require("@nestjs/common/exceptions");
const abstracts_1 = require("../../core/abstracts");
const userEnum_1 = require("../../core/enum/userEnum");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon2 = require("argon2");
let AuthUseCases = class AuthUseCases {
    constructor(dataServices, jwtService) {
        this.dataServices = dataServices;
        this.jwtService = jwtService;
    }
    async validateUser(email, senha) {
        let user = await this.dataServices.users.getOne(email, senha);
        if (user && user.senha === senha)
            return user;
    }
    async signIn(email, senha) {
        let user = await this.dataServices.users.getEmail(email);
        if (!user)
            throw new exceptions_1.UnauthorizedException(userEnum_1.AuthEnum.Unauthorized);
        const passwordMatches = await argon2.verify(user.senha, senha);
        if (!passwordMatches)
            throw new exceptions_1.BadRequestException(userEnum_1.AuthEnum.InvalidPassword);
        return this.getTokens(user);
    }
    async getTokens(payload) {
        return {
            sub: payload._id,
            nome: payload.nome,
            sobrenome: payload.sobrenome,
            email: payload.email,
            token: this.jwtService.sign({
                user_id: payload._id.toString(),
                nome: payload.nome,
                sobrenome: payload.sobrenome,
                email: payload.email
            }),
            refreshToken: this.jwtService.sign({
                user_id: payload._id.toString(),
                nome: payload.nome,
                sobrenome: payload.sobrenome,
                email: payload.email
            })
        };
    }
    hashData(data) {
        return argon2.hash(data);
    }
};
AuthUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [abstracts_1.IDataServices,
        jwt_1.JwtService])
], AuthUseCases);
exports.AuthUseCases = AuthUseCases;
//# sourceMappingURL=auth.use-case.js.map