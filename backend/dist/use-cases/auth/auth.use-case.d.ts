import { IDataServices } from '../../core/abstracts';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core';
export declare class AuthUseCases {
    private dataServices;
    private jwtService;
    constructor(dataServices: IDataServices, jwtService: JwtService);
    validateUser(email: string, senha: string): Promise<any>;
    signIn(email: string, senha: string): Promise<{
        sub: string;
        nome: string;
        sobrenome: string;
        email: string;
        token: string;
        refreshToken: string;
    }>;
    getTokens(payload: User): Promise<{
        sub: string;
        nome: string;
        sobrenome: string;
        email: string;
        token: string;
        refreshToken: string;
    }>;
    hashData(data: string): Promise<string>;
}
