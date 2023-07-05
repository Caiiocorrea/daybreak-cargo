import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  user_id: string;
  motorista: string;

  @IsString({ message: 'Bloquinho deve ser uma string' })
  @IsNotEmpty({ message: 'Bloquinho é obrigatório' })
  @ApiProperty({ description: 'Quando bloquinho preenchido' })
  bloquinho: string;

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

  @IsString({ message: 'Km deve ser uma string' })
  // @IsNotEmpty()
  @ApiProperty({ description: 'Total de KM percorrido' })
  kmCorrida: string;

  @IsString({ message: 'Valor deve ser uma string' })
  // @IsNotEmpty()
  @ApiProperty({ description: 'Valor total da viagem' })
  valorCorrida: string;

  @IsString({ message: 'Status deve ser uma string' })
  @IsNotEmpty({ message: 'Status é obrigatório' })
  @ApiProperty({ description: 'Status da viagem' })
  status: string;

  @IsArray({ message: 'Passageiros deve ser um array' })
  @IsNotEmpty({ message: 'Passageiros é obrigatório' })
  @ApiProperty({ description: 'Passageiros da viagem' })
  passageiros: [{
    passageiro: string,
    status: string
  }];
}

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  bloquinho: string;

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
  @IsNotEmpty()
  @ApiProperty()
  motorista: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  kmCorrida: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  valorCorrida: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  passageiros: [{
    passageiro: string,
    status: string
  }];
}