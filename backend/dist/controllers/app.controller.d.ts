import { AuthUseCases } from '..//use-cases/auth/auth.use-case';
import { AuthDto } from 'src/core/dtos';
export declare class AppController {
    private authService;
    constructor(authService: AuthUseCases);
    getHello(): {};
    signIn(user: AuthDto): Promise<{
        sub: number;
        nome: string;
        sobrenome: string;
        email: string;
        token: string;
        refreshToken: string;
    }>;
}
