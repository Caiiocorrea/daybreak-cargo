import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  Scopes,
  Table,
  UpdatedAt
} from "sequelize-typescript";
import Order from "./orders.model";


@Table({ tableName: "passengers" })
export default class Passengers extends Model<Passengers> {
  @Column({
    autoIncrement: false,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
  })
  id: number;

  @ForeignKey(() => Order)
  @Column
  order_id: number

  @Column
  nome: string;

  @Column
  status: string;

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

  @BelongsTo(() => Order)
  order: Order;
}