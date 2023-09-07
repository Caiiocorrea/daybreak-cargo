import { Vehicle } from "./vehicle.entity";
export declare class User {
    id?: number;
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    veiculos: Vehicle[];
    created_at?: string;
    updated_at?: string;
}
