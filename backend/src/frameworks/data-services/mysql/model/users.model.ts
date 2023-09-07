import {
  Column,
  CreatedAt,
  DataType,
  Default,
  HasMany,
  Model,
  Scopes,
  Table,
  UpdatedAt
} from "sequelize-typescript";
import Vehicle from "./vehicles.model";


@Table({ tableName: "users" })
export default class User extends Model<User> {
  @Column({
    autoIncrement: false,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
  })
  id: number;

  @Column
  nome: string

  @Column
  sobrenome: string

  @Column({ unique: true })
  email: string;

  @Column
  senha: string;

  @Default(true)
  @Column
  active: boolean;

  /* auto */
  @CreatedAt
  @Column
  created_at: Date;

  @UpdatedAt
  @Column
  updated_at: Date;

  @HasMany(() => Vehicle)
  vehicles: Vehicle[];
}