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
exports.UserUseCases = void 0;
const common_1 = require("@nestjs/common");
const auth_use_case_1 = require("../auth/auth.use-case");
const userEnum_1 = require("../../core/enum/userEnum");
let UserUseCases = class UserUseCases {
    constructor(userRepository, vehicleRepository, authUseCases) {
        this.userRepository = userRepository;
        this.vehicleRepository = vehicleRepository;
        this.authUseCases = authUseCases;
    }
    async getAllUsers(query, user) {
        const regexFilter = {};
        let result = [];
        if (query._id) {
            regexFilter['user_id'] = user.locals.user.user_id;
            regexFilter['id'] = query._id;
            result[0] = await this.userRepository.findByPk(regexFilter['id']);
        }
        if (!query._id) {
            for (const key in query) {
                if (query.hasOwnProperty(key)) {
                    regexFilter[key] = new RegExp(query[key], 'i');
                    delete regexFilter['offset'];
                    delete regexFilter['limit'];
                }
            }
            result = await this.userRepository.findAll({
                where: regexFilter,
                offset: Number(query.offset),
                limit: Number(query.limit),
                include: [{ all: true, nested: true }],
                attributes: { exclude: ['senha'] }
            });
        }
        return result !== null && result !== void 0 ? result : [];
    }
    async getUserByEmailSenha(email, senha) {
        const users = await this.userRepository.findOne({ where: { email, senha } });
        if (!users)
            throw new common_1.BadRequestException(userEnum_1.UserEnum.notFound);
        return users;
    }
    async getUserByEmail(email) {
        const users = await this.userRepository.findOne({ where: { email } });
        if (!users)
            throw new common_1.BadRequestException(userEnum_1.UserEnum.notFound);
        return users;
    }
    async createUser(createUserDto, user) {
        const userExists = await this.userRepository.findOne({ where: { email: createUserDto.email } });
        if (userExists)
            throw new common_1.BadRequestException(userEnum_1.UserEnum.exist);
        await this.userRepository.create(Object.assign(Object.assign({}, createUserDto), { senha: await this.authUseCases.hashData(createUserDto.senha) })).then(async (newUser) => {
            createUserDto.veiculos.map(async (dados) => {
                await this.vehicleRepository.create(Object.assign(Object.assign({}, dados), { user_id: newUser.id }));
            });
        }).catch((err) => { throw new common_1.BadRequestException(err); });
    }
    updateUser(userId, updateUserDto, user) {
        return this.userRepository.update(updateUserDto, { where: { id: userId } }).then(async (updatedUser) => {
            if (updatedUser[0] === 0)
                throw new common_1.BadRequestException(userEnum_1.UserEnum.notFound);
            updateUserDto.veiculos.map(async (dados) => {
                await this.vehicleRepository.update(dados, { where: { id: dados.id } });
            });
        }).catch((err) => { throw new common_1.BadRequestException(err); });
    }
};
UserUseCases = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USERS_REPOSITORY')),
    __param(1, (0, common_1.Inject)('VEHICLE_REPOSITORY')),
    __metadata("design:paramtypes", [Object, Object, auth_use_case_1.AuthUseCases])
], UserUseCases);
exports.UserUseCases = UserUseCases;
//# sourceMappingURL=user.use-case.js.map