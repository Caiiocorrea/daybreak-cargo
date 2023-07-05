import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  fabricante: string

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  modelo: string

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  ano: number

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  cor: string

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  placa: string

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  tipo: string
}

export class UpdateVehicleDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  fabricante: string

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  modelo: string

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  ano: number

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  cor: string

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  placa: string

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  tipo: string
}