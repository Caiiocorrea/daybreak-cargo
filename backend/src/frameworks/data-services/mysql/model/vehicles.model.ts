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
import User from "./users.model";



@Table({ tableName: "vehicles" })
export default class Vehicle extends Model<Vehicle> {
    @Column({
        autoIncrement: true,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: number;

    @ForeignKey(() => User)
    @Column
    user_id: number;

    @Column
    fabricante: string;

    @Column
    modelo: string;

    @Column
    ano: number;

    @Column
    cor: string;

    @Column
    placa: string;

    @Column
    tipo: string;

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

    @BelongsTo(() => User)
    user: User;
}