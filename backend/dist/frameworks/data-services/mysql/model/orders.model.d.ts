import { Model } from "sequelize-typescript";
import Passengers from "./passengers.model";
import User from "./users.model";
export default class Order extends Model<Order> {
    id: number;
    user_id: number;
    empresa: string;
    motorista: string;
    origem: string;
    destino: string;
    bloquinho: string;
    kmCorrida: string;
    valorCorrida: string;
    status: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    user: User;
    passengers: Passengers[];
}
