export declare class CreateOrderDto {
    user_id: string;
    motorista: string;
    bloquinho: string;
    origem: string;
    destino: string;
    empresa: string;
    kmCorrida: string;
    valorCorrida: string;
    status: string;
    passageiros: [
        {
            passageiro: string;
            status: string;
        }
    ];
}
export declare class UpdateOrderDto {
    bloquinho: string;
    destino: string;
    origem: string;
    empresa: string;
    motorista: string;
    kmCorrida: string;
    valorCorrida: string;
    status: string;
    passageiros: [
        {
            passageiro: string;
            status: string;
        }
    ];
}
