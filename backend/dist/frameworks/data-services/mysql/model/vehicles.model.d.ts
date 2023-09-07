import { Model } from "sequelize-typescript";
import User from "./users.model";
export default class Vehicle extends Model<Vehicle> {
    id: number;
    user_id: number;
    fabricante: string;
    modelo: string;
    ano: number;
    cor: string;
    placa: string;
    tipo: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    user: User;
}
