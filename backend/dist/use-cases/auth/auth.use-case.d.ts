import User from '../../frameworks/data-services/mysql/model/users.model';
import { JwtService } from '@nestjs/jwt';
export declare class AuthUseCases {
    private userRepository;
    private jwtService;
    constructor(userRepository: typeof User, jwtService: JwtService);
    validateUser(email: string, senha: string): Promise<any>;
    signIn(email: string, senha: string): Promise<{
        sub: any;
        nome: any;
        sobrenome: any;
        email: any;
        token: string;
        refreshToken: string;
    }>;
    getTokens(payload: User): Promise<{
        sub: any;
        nome: any;
        sobrenome: any;
        email: any;
        token: string;
        refreshToken: string;
    }>;
    hashData(data: string): Promise<string>;
}
