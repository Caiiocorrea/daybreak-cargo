import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  @Prop({ required: true })
  fabricante: string

  @Prop({ required: true })
  modelo: string

  @Prop({ required: true })
  ano: number

  @Prop({ required: true })
  cor: string

  @Prop({ required: true })
  placa: string

  @Prop({ required: true })
  tipo: string

  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
