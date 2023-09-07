import { CreatePassengersDto, UpdatePassengersDto } from './passengers.dto';
export declare class CreateOrderDto {
    user_id: number;
    motorista: string;
    numero_cap: string;
    centro_custo: string;
    bloquinho: string;
    sgs: string;
    origem: string;
    destino: string;
    empresa: string;
    km_inicial: string;
    km_final: string;
    valorCorrida: string;
    status: string;
    passageiros: CreatePassengersDto[];
    data_viagem: string;
    hora_viagem: string;
}
export declare class UpdateOrderDto {
    user_id: number;
    motorista: string;
    numero_cap: string;
    centro_custo: string;
    bloquinho: string;
    sgs: string;
    destino: string;
    origem: string;
    empresa: string;
    km_inicial: string;
    km_final: string;
    valorCorrida: string;
    status: string;
    passageiros: UpdatePassengersDto[];
    active: boolean;
    data_viagem: string;
    hora_viagem: string;
}
