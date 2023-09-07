import { CreateVehicleDto, UpdateVehicleDto } from './index';
import * as Joi from 'joi';
export declare const userSchema: Joi.ObjectSchema<any>;
export declare class AuthDto {
    email: string;
    senha: string;
}
export declare class CreateUserDto {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    veiculos: CreateVehicleDto[];
}
export declare class UpdateUserDto {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    veiculos: UpdateVehicleDto[];
    active: boolean;
}
