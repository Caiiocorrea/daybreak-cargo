import { CreatePassengersDto, UpdatePassengersDto } from './passengers.dto';
export declare class CreateOrderDto {
    user_id: number;
    motorista: string;
    numero_cap: string;
    centro_custo: string;
    bloquinho: string;
    origem: string;
    destino: string;
    empresa: string;
    km_inicial: string;
    km_final: string;
    valorCorrida: string;
    status: string;
    passageiros: CreatePassengersDto[];
}
export declare class UpdateOrderDto {
    user_id: number;
    motorista: string;
    numero_cap: string;
    centro_custo: string;
    bloquinho: string;
    destino: string;
    origem: string;
    empresa: string;
    km_inicial: string;
    km_final: string;
    valorCorrida: string;
    status: string;
    passageiros: UpdatePassengersDto[];
    active: boolean;
}
