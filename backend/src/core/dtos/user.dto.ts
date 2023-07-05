import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { CreateVehicleDto, UpdateVehicleDto } from './index';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export const userSchema = Joi.object({
  page: Joi.number().integer().messages({ 'number.base': 'O campo page deve ser do tipo inteiro' }),
  limit: Joi.number().integer().messages({ 'number.base': 'O campo limit deve ser do tipo inteiro' }),
  _id: Joi.string().optional().messages({ 'string.base': 'O campo _id deve ser do tipo string' }),
  nome: Joi.string().optional().messages({ 'string.base': 'O campo nome deve ser do tipo string' }),
  sobrenome: Joi.string().optional().messages({ 'string.base': 'O campo sobrenome deve ser do tipo string' }),
  email: Joi.string().optional().messages({ 'string.base': 'O campo email deve ser do tipo string' }),
});

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  senha: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sobrenome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  senha: string;

  @IsArray()
  @ApiProperty()
  veiculos: CreateVehicleDto[];
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sobrenome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  senha: string;

  @IsArray()
  @ApiProperty()
  veiculos: UpdateVehicleDto[];
}