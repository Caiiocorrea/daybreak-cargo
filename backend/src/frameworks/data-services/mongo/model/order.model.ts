import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  user_id: string;

  @Prop()
  empresa: string;

  @Prop()
  motorista: string;

  @Prop()
  origem: string;

  @Prop()
  destino: string;

  @Prop()
  bloquinho: string;

  @Prop()
  kmCorrida: string;

  @Prop({ type: Array })
  passageiros: [];

  @Prop()
  valorCorrida: string;

  @Prop()
  status: string;

  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);