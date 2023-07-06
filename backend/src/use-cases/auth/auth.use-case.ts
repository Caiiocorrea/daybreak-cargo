import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';
import User from '../../frameworks/data-services/mysql/model/users.model';
import { Inject, Injectable } from '@nestjs/common';
import { AuthEnum } from '../../core/enum/userEnum';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthUseCases {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
    private jwtService: JwtService

  ) { }

  async validateUser(email: string, senha: string): Promise<any> {
    let user = await this.userRepository.findOne({ where: { email } });
    if (user && user.senha === senha) return user
  }

  async signIn(email: string, senha: string) {
    let user: User = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException(AuthEnum.Unauthorized);
    const passwordMatches = await argon2.verify(user.senha, senha);
    if (!passwordMatches) throw new BadRequestException(AuthEnum.InvalidPassword);
    return this.getTokens(user);
  }

  async getTokens(payload: User) {
    return {
      sub: payload.id,
      nome: payload.nome,
      sobrenome: payload.sobrenome,
      email: payload.email,
      token: this.jwtService.sign({
        user_id: payload.id,
        nome: payload.nome,
        sobrenome: payload.sobrenome,
        email: payload.email
      }),
      refreshToken: this.jwtService.sign({
        user_id: payload.id,
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
