import {
  Column,
  Model,
  Table,
} from "sequelize-typescript";


@Table({ tableName: "declaration" })
export default class Declaration extends Model<Declaration> {
  @Column
  ID: number;

  @Column
  nome: string;

  @Column
  morada: string;

  @Column
  Dec_Email: string;

  @Column
  Porta: string;

  @Column
  Andar: string;

  @Column
  Cod_pt: string;

  @Column
  Dec_CP4: string;

  @Column
  Dec_CP3: string;

  @Column
  Dec_Loc: string;

  @Column
  Cod_Postal: string;

  @Column
  Localidade: string;

  @Column
  Contacto_tel: string;

  @Column
  NIF: string;

  @Column
  BI: string;

  @Column
  BI_validade: string;

  @Column
  BI_Arquivo: string;

  @Column
  Tipo_Viatura: string;

  @Column
  Marca_modelo_dec: string;

  @Column
  Marca: string;

  @Column
  Modelo: string;

  @Column
  Cor: string;

  @Column
  Data_Mat: string;

  @Column
  Matricula: string;

  @Column
  Cat: string;

  @Column
  Tipo: string;

  @Column
  Cilindrada: string;

  @Column
  Quadro: string;

  @Column
  Peso: string;

  @Column
  Lugares: string;

  @Column
  Tipo_Comb: string;

  @Column
  Serv: string;

  @Column
  Ano_fabrico: string;

  @Column
  KMS: string;

  @Column
  Potencia: string;

  @Column
  Potencia_Check: string;

  @Column
  Retoma_Check: string;

  @Column
  Marca_Retoma: string;

  @Column
  Modelo_Retoma: string;

  @Column
  Matricula_Retoma: string;

  @Column
  Data_Retoma: Date;

  @Column
  Hora_Retoma: string;

  @Column
  KM_Retoma: string;

  @Column
  Reg_Block: string;

  @Column
  Data_reg: string;

  @Column
  Log_Dec_Nome: string
}