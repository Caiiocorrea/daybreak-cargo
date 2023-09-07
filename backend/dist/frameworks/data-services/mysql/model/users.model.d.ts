import { Model } from "sequelize-typescript";
import Vehicle from "./vehicles.model";
export default class User extends Model<User> {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    vehicles: Vehicle[];
}
