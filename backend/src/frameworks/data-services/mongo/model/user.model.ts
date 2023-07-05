import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Vehicle } from './vehicle.model';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ required: true })
  sobrenome: string;

  @Prop({ ref: 'vehicles' })
  veiculos: Vehicle[]

  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
