/// <reference types="mongoose" />
export declare type VehicleDocument = Vehicle & Document;
export declare class Vehicle {
    fabricante: string;
    modelo: string;
    ano: number;
    cor: string;
    placa: string;
    tipo: string;
    created_at: string;
    updated_at: string;
}
export declare const VehicleSchema: import("mongoose").Schema<import("mongoose").Document<Vehicle, any, any>, import("mongoose").Model<import("mongoose").Document<Vehicle, any, any>, any, any, any>, any>;
