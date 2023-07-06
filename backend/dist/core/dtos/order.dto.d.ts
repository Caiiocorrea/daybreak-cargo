import { CreatePassengersDto, UpdatePassengersDto } from './passengers.dto';
export declare class CreateOrderDto {
    user_id: number;
    motorista: string;
    bloquinho: string;
    origem: string;
    destino: string;
    empresa: string;
    kmCorrida: string;
    valorCorrida: string;
    status: string;
    passageiros: CreatePassengersDto[];
}
export declare class UpdateOrderDto {
    user_id: number;
    motorista: string;
    bloquinho: string;
    destino: string;
    origem: string;
    empresa: string;
    kmCorrida: string;
    valorCorrida: string;
    status: string;
    passageiros: UpdatePassengersDto[];
    active: boolean;
}
