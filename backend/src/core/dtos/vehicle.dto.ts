import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
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

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  active: boolean;
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

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  active: boolean;
}