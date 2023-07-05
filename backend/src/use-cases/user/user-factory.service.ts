import { CreateUserDto, UpdateUserDto } from '../../core/dtos';
import { Injectable } from '@nestjs/common';
import { User } from '../../core/entities';
import * as moment from 'moment';

@Injectable()
export class UserFactoryService {
  getAllUser(user: User) {
    const newUser = new User();
    newUser._id = user._id;
    newUser.nome = user.nome;
    newUser.sobrenome = user.sobrenome;
    newUser.email = user.email;
    newUser.senha = user.senha;
    newUser.veiculos = user.veiculos.map((dados) => {
      return {
        _id: dados._id,
        fabricante: dados.fabricante,
        modelo: dados.modelo,
        ano: dados.ano,
        cor: dados.cor,
        placa: dados.placa,
        tipo: dados.tipo
      }
    }) ?? []
    return [newUser];
  }

  createNewUser(createUserDto: CreateUserDto) {
    const newUser = new User();
    newUser.nome = createUserDto.nome;
    newUser.sobrenome = createUserDto.sobrenome;
    newUser.email = createUserDto.email;
    newUser.senha = createUserDto.senha;
    newUser.created_at = `${moment().format("YYYY-MM-DD HH:mm:ss")}`
    newUser.updated_at = ''
    newUser.veiculos = createUserDto.veiculos.map((dados) => {
      return {
        fabricante: dados.fabricante,
        modelo: dados.modelo,
        ano: dados.ano,
        cor: dados.cor,
        placa: dados.placa,
        tipo: dados.tipo
      }
    }) ?? []
    return newUser;
  }

  updateUser(updateUserDto: UpdateUserDto) {
    const newUser = new User();
    newUser.nome = updateUserDto.nome;
    newUser.sobrenome = updateUserDto.sobrenome;
    newUser.email = updateUserDto.email;
    newUser.senha = updateUserDto.senha;
    newUser.updated_at = `${moment().format("YYYY-MM-DD HH:mm:ss")}`
    newUser.veiculos = updateUserDto.veiculos.map((dados) => {
      return {
        fabricante: dados.fabricante,
        modelo: dados.modelo,
        ano: dados.ano,
        cor: dados.cor,
        placa: dados.placa,
        tipo: dados.tipo
      }
    }) || []
    return newUser;
  }
}
