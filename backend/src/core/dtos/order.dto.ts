import { CreatePassengersDto, UpdatePassengersDto } from './passengers.dto';
import { IsString, IsNotEmpty, IsArray, IsBoolean, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsEmpty()
  user_id: number;

  @IsEmpty()
  motorista: string;

  @IsString({ message: 'Número CAP deve ser uma string' })
  @ApiProperty({ description: 'Número CAP do solicitante' })
  numero_cap: string;

  @IsString({ message: 'Centro de Custo deve ser uma string' })
  @ApiProperty({ description: 'Centro de Custo do solicitante' })
  centro_custo: string;

  @IsString({ message: 'Bloquinho deve ser uma string' })
  @IsNotEmpty({ message: 'Bloquinho é obrigatório' })
  @ApiProperty({ description: 'Quando bloquinho preenchido' })
  bloquinho: string;

  @IsString()
  @ApiProperty()
  sgs: string;

  @IsString({ message: 'Origem deve ser uma string' })
  @IsNotEmpty({ message: 'Origem é obrigatório' })
  @ApiProperty({ description: 'Local de início da viagem' })
  origem: string;

  @IsString({ message: 'Destino deve ser uma string' })
  @IsNotEmpty({ message: 'Destino é obrigatório' })
  @ApiProperty({ description: 'Local de destino da viagem' })
  destino: string;

  @IsString({ message: 'Empresa deve ser uma string' })
  @IsNotEmpty({ message: 'Empresa é obrigatório' })
  @ApiProperty({ description: 'Empresa solicitante' })
  empresa: string;

  @IsString({ message: 'Km Inicial deve ser uma string' })
  @ApiProperty({ description: 'Km ao iniciar corrida' })
  km_inicial: string;

  @IsString({ message: 'Km Final deve ser uma string' })
  @ApiProperty({ description: 'Km ao finalizar corrida' })
  km_final: string;

  @IsString({ message: 'Valor deve ser uma string' })
  // @IsNotEmpty({ message: 'Valor é obrigatórioS' })
  @ApiProperty({ description: 'Valor total da viagem' })
  valorCorrida: string;

  @IsString({ message: 'Status deve ser uma string' })
  @IsNotEmpty({ message: 'Status é obrigatório' })
  @ApiProperty({ description: 'Status da viagem' })
  status: string;

  @IsArray({ message: 'Passageiros deve ser um array' })
  @IsNotEmpty({ message: 'Passageiros é obrigatório' })
  @ApiProperty({ description: 'Passageiros da viagem' })
  passageiros: CreatePassengersDto[];

  @IsString()
  @ApiProperty()
  data_viagem: string;


  @IsString()
  @ApiProperty()
  hora_viagem: string;
}

export class UpdateOrderDto {
  @IsEmpty()
  user_id: number;

  @IsEmpty()
  motorista: string;

  @IsString({ message: 'Número CAP deve ser uma string' })
  @ApiProperty({ description: 'Número CAP do solicitante' })
  numero_cap: string;

  @IsString({ message: 'Centro de Custo deve ser uma string' })
  @ApiProperty({ description: 'Centro de Custo do solicitante' })
  centro_custo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  bloquinho: string;

  @IsString()
  @ApiProperty()
  sgs: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  destino: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  origem: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  empresa: string;

  @IsString()
  @ApiProperty()
  km_inicial: string;

  @IsString()
  @ApiProperty()
  km_final: string;

  @IsString()
  // @IsNotEmpty()
  @ApiProperty()
  valorCorrida: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  passageiros: UpdatePassengersDto[];

  @IsBoolean()
  @ApiProperty()
  active: boolean;

  @IsString()
  @ApiProperty()
  data_viagem: string;


  @IsString()
  @ApiProperty()
  hora_viagem: string;
}