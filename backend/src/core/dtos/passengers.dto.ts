import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePassengersDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  order_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: string
}

export class UpdatePassengersDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  order_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status: string

  @IsBoolean()
  @ApiProperty()
  active: boolean;
}