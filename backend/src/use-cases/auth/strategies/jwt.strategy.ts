import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:  process.env.JWT_SECRET_KEY
    });
  }

  async validate(payload: any) {
    return { 
      id: payload.id, 
      nome: payload.nome, 
      email: payload.email 
    };
  }
}