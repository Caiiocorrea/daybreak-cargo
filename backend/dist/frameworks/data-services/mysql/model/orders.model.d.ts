import { Model } from "sequelize-typescript";
import Passengers from "./passengers.model";
import User from "./users.model";
export default class Order extends Model<Order> {
    id: number;
    user_id: number;
    numero_cap: string;
    centro_custo: string;
    empresa: string;
    motorista: string;
    origem: string;
    destino: string;
    bloquinho: string;
    km_inicial: string;
    km_final: string;
    valorCorrida: string;
    status: string;
    active: boolean;
    data_viagem: string;
    hora_viagem: string;
    created_at: Date;
    updated_at: Date;
    user: User;
    passengers: Passengers[];
}
