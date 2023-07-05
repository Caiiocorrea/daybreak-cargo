import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthUseCases } from '../auth.use-case';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authUseCases: AuthUseCases) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authUseCases.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}