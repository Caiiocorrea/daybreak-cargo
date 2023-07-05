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
exports.UserUseCases = void 0;
const common_1 = require("@nestjs/common");
const user_factory_service_1 = require("./user-factory.service");
const abstracts_1 = require("../../core/abstracts");
const auth_use_case_1 = require("../auth/auth.use-case");
const userEnum_1 = require("../../core/enum/userEnum");
let UserUseCases = class UserUseCases {
    constructor(userFactoryService, dataServices, authUseCases) {
        this.userFactoryService = userFactoryService;
        this.dataServices = dataServices;
        this.authUseCases = authUseCases;
    }
    async getAllUsers(query, user) {
        let users = [];
        users = await this.dataServices.users.getAll(query.page, query.limit, query, user);
        users[0].veiculos = await this.dataServices.vehicles.getAll(query.page, query.limit, users[0].veiculos[0], {});
        if (!users)
            throw new common_1.BadRequestException({ message: userEnum_1.UserEnum.allnotFound });
        return this.userFactoryService.getAllUser(users[0]);
    }
    async getUserByEmailSenha(email, senha) {
        const users = await this.dataServices.users.getOne(email, senha);
        if (!users)
            throw new common_1.BadRequestException(userEnum_1.UserEnum.notFound);
        return users;
    }
    async getUserByEmail(email) {
        const users = await this.dataServices.users.getEmail(email);
        if (!users)
            throw new common_1.BadRequestException(userEnum_1.UserEnum.notFound);
        return users;
    }
    async createUser(createUserDto) {
        const userExists = await this.dataServices.users.getEmail(createUserDto.email);
        if (userExists)
            throw new common_1.BadRequestException(userEnum_1.UserEnum.exist);
        const hash = await this.authUseCases.hashData(createUserDto.senha);
        const userParse = this.userFactoryService.createNewUser(Object.assign(Object.assign({}, createUserDto), { senha: hash }));
        const newVehicle = await this.dataServices.vehicles.create(userParse.veiculos[0]);
        const newUser = await this.dataServices.users.create(Object.assign(Object.assign({}, userParse), { veiculos: [{ _id: newVehicle._id }] }));
        return this.authUseCases.getTokens(newUser);
    }
    updateUser(userId, updateUserDto) {
        const user = this.userFactoryService.updateUser(updateUserDto);
        return this.dataServices.users.update(userId, user);
    }
};
UserUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_factory_service_1.UserFactoryService,
        abstracts_1.IDataServices,
        auth_use_case_1.AuthUseCases])
], UserUseCases);
exports.UserUseCases = UserUseCases;
//# sourceMappingURL=user.use-case.js.map