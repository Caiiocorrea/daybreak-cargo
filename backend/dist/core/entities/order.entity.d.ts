export declare class Order {
    id?: string;
    user_id?: string;
    numero_cap: string;
    centro_custo: string;
    bloquinho: string;
    destino: string;
    empresa: string;
    motorista: string;
    km_inicial: string;
    km_final: string;
    origem: string;
    valorCorrida: string;
    status: string;
    passageiros: Passageiros[];
    data_viagem: string;
    hora_viagem: string;
    created_at?: string;
    updated_at?: string;
}
export declare class Passageiros {
    id?: string;
    order_id: number;
    passageiro: string;
    status: string;
}
export declare class orderResponse {
    total_restante: number;
    page: number;
    limit: number;
    count: number;
    data: Order[];
}
