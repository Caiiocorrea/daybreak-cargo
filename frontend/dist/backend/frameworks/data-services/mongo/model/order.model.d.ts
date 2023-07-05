/// <reference types="mongoose" />
export declare type OrderDocument = Order & Document;
export declare class Order {
    user_id: string;
    empresa: string;
    motorista: string;
    origem: string;
    destino: string;
    bloquinho: string;
    kmCorrida: string;
    passageiros: [];
    valorCorrida: string;
    status: string;
    created_at: string;
    updated_at: string;
}
export declare const OrderSchema: import("mongoose").Schema<import("mongoose").Document<Order, any, any>, import("mongoose").Model<import("mongoose").Document<Order, any, any>, any, any, any>, any>;
