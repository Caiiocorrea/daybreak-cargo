"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactoryService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../../core/entities");
const moment = require("moment");
let UserFactoryService = class UserFactoryService {
    getAllUser(user) {
        var _a;
        const newUser = new entities_1.User();
        newUser._id = user._id;
        newUser.nome = user.nome;
        newUser.sobrenome = user.sobrenome;
        newUser.email = user.email;
        newUser.senha = user.senha;
        newUser.veiculos = (_a = user.veiculos.map((dados) => {
            return {
                _id: dados._id,
                fabricante: dados.fabricante,
                modelo: dados.modelo,
                ano: dados.ano,
                cor: dados.cor,
                placa: dados.placa,
                tipo: dados.tipo
            };
        })) !== null && _a !== void 0 ? _a : [];
        return [newUser];
    }
    createNewUser(createUserDto) {
        var _a;
        const newUser = new entities_1.User();
        newUser.nome = createUserDto.nome;
        newUser.sobrenome = createUserDto.sobrenome;
        newUser.email = createUserDto.email;
        newUser.senha = createUserDto.senha;
        newUser.created_at = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
        newUser.updated_at = '';
        newUser.veiculos = (_a = createUserDto.veiculos.map((dados) => {
            return {
                fabricante: dados.fabricante,
                modelo: dados.modelo,
                ano: dados.ano,
                cor: dados.cor,
                placa: dados.placa,
                tipo: dados.tipo
            };
        })) !== null && _a !== void 0 ? _a : [];
        return newUser;
    }
    updateUser(updateUserDto) {
        const newUser = new entities_1.User();
        newUser.nome = updateUserDto.nome;
        newUser.sobrenome = updateUserDto.sobrenome;
        newUser.email = updateUserDto.email;
        newUser.senha = updateUserDto.senha;
        newUser.updated_at = `${moment().format("YYYY-MM-DD HH:mm:ss")}`;
        newUser.veiculos = updateUserDto.veiculos.map((dados) => {
            return {
                fabricante: dados.fabricante,
                modelo: dados.modelo,
                ano: dados.ano,
                cor: dados.cor,
                placa: dados.placa,
                tipo: dados.tipo
            };
        }) || [];
        return newUser;
    }
};
UserFactoryService = __decorate([
    (0, common_1.Injectable)()
], UserFactoryService);
exports.UserFactoryService = UserFactoryService;
//# sourceMappingURL=user-factory.service.js.map