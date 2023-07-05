import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';
import { IDataServices } from '../../core/abstracts';
import { AuthEnum } from 'src/core/enum/userEnum';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User } from 'src/core';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthUseCases {
  constructor(
    private dataServices: IDataServices,
    private jwtService: JwtService

  ) { }

  async validateUser(email: string, senha: string): Promise<any> {
    let user = await this.dataServices.users.getOne(email, senha)
    if (user && user.senha === senha) return user
  }

  async signIn(email: string, senha: string) {
    let user: User = await this.dataServices.users.getEmail(email)
    if (!user) throw new UnauthorizedException(AuthEnum.Unauthorized);
    const passwordMatches = await argon2.verify(user.senha, senha);
    if (!passwordMatches) throw new BadRequestException(AuthEnum.InvalidPassword);
    return this.getTokens(user);
  }

  async getTokens(payload: User) {
    return {
      sub: payload._id,
      nome: payload.nome,
      sobrenome: payload.sobrenome,
      email: payload.email,
      token: this.jwtService.sign({
        user_id: payload._id.toString(),
        nome: payload.nome,
        sobrenome: payload.sobrenome,
        email: payload.email
      }),
      refreshToken: this.jwtService.sign({
        user_id: payload._id.toString(),
        nome: payload.nome,
        sobrenome: payload.sobrenome,
        email: payload.email
      })
    }
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
