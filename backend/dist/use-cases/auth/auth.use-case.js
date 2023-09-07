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
exports.AuthUseCases = void 0;
const exceptions_1 = require("@nestjs/common/exceptions");
const common_1 = require("@nestjs/common");
const userEnum_1 = require("../../core/enum/userEnum");
const jwt_1 = require("@nestjs/jwt");
const argon2 = require("argon2");
let AuthUseCases = class AuthUseCases {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, senha) {
        let user = await this.userRepository.findOne({ where: { email } });
        if (user && user.senha === senha)
            return user;
    }
    async signIn(email, senha) {
        let user = await this.userRepository.findOne({ where: { email } });
        if (!user)
            throw new exceptions_1.UnauthorizedException(userEnum_1.AuthEnum.Unauthorized);
        const passwordMatches = await argon2.verify(user.senha, senha);
        if (!passwordMatches)
            throw new exceptions_1.BadRequestException(userEnum_1.AuthEnum.InvalidPassword);
        return this.getTokens(user);
    }
    async getTokens(payload) {
        return {
            sub: payload.id,
            nome: payload.nome,
            sobrenome: payload.sobrenome,
            email: payload.email,
            token: this.jwtService.sign({
                user_id: payload.id,
                nome: payload.nome,
                sobrenome: payload.sobrenome,
                email: payload.email
            }),
            refreshToken: this.jwtService.sign({
                user_id: payload.id,
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
    __param(0, (0, common_1.Inject)('USERS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AuthUseCases);
exports.AuthUseCases = AuthUseCases;
//# sourceMappingURL=auth.use-case.js.map