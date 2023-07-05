import { Vehicle } from "./vehicle.entity";

export class User {
  _id?: string
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  veiculos: Vehicle[];
  created_at?: string;
  updated_at?: string;
}