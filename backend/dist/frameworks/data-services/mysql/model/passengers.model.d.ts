import { Model } from "sequelize-typescript";
import Order from "./orders.model";
export default class Passengers extends Model<Passengers> {
    id: number;
    order_id: number;
    nome: string;
    status: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    order: Order;
}
