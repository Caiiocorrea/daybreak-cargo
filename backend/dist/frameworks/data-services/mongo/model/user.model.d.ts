/// <reference types="mongoose" />
import { Vehicle } from './vehicle.model';
export declare type UserDocument = User & Document;
export declare class User {
    nome: string;
    email: string;
    senha: string;
    sobrenome: string;
    veiculos: Vehicle[];
    created_at: string;
    updated_at: string;
}
export declare const UserSchema: import("mongoose").Schema<import("mongoose").Document<User, any, any>, import("mongoose").Model<import("mongoose").Document<User, any, any>, any, any, any>, any>;
