import {
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  Table,
  UpdatedAt
} from "sequelize-typescript";


@Table({ tableName: "conversation" })
export default class Conversation extends Model<Conversation> {
  @Column({
    autoIncrement: false,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
  })
  id: number;

  @Column
  SmsMessageSid: string

  @Column
  NumMedia: string

  @Column
  ProfileName: string;

  @Column
  SmsSid: string;

  @Column
  WaId: string;

  @Column
  SmsStatus: string;

  @Column
  Body: string;

  @Column
  Stage: string;

  @Column
  To: string;

  @Column
  NumSegments: string;

  @Column
  ReferralNumMedia: string;

  @Column
  MessageSid: string;

  @Column
  AccountSid: string;

  @Column
  From: string;

  @Column
  ApiVersion: string;

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
}