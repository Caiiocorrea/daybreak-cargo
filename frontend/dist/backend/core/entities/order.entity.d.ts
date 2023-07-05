export declare class Order {
    _id?: string;
    user_id?: string;
    bloquinho: string;
    destino: string;
    empresa: string;
    motorista: string;
    kmCorrida: string;
    origem: string;
    valorCorrida: string;
    status: string;
    passageiros: Passageiros[];
    created_at?: string;
    updated_at?: string;
}
export declare class Passageiros {
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
