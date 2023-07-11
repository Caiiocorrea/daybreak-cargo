import {
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Model,
    Scopes,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import Passengers from "./passengers.model";
import User from "./users.model";


@Table({ tableName: "orders" })
export default class Order extends Model<Order> {
    @Column({
        autoIncrement: true,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: number;

    @ForeignKey(() => User)
    @Column
    user_id: number

    @Column
    numero_cap: string;

    @Column
    centro_custo: string;

    @Column
    empresa: string;

    @Column
    motorista: string;

    @Column
    origem: string;

    @Column
    destino: string;

    @Column
    bloquinho: string;

    @Column
    sgs: string;

    @Column
    km_inicial: string;

    @Column
    km_final: string;

    @Column
    valorCorrida: string;

    @Column
    status: string;

    @Default(true)
    @Column
    active: boolean;

    @Column
    data_viagem: string

    @Column
    hora_viagem: string

    /* auto */
    @CreatedAt
    @Column
    created_at: Date;

    @UpdatedAt
    @Column
    updated_at: Date;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Passengers)
    passengers: Passengers[];
}