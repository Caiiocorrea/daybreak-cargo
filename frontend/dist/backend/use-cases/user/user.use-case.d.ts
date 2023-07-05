import { CreateUserDto, UpdateUserDto } from '../../core/dtos';
import { UserFactoryService } from './user-factory.service';
import { User } from '../../core/entities/index';
import { IDataServices } from '../../core/abstracts';
import { AuthUseCases } from '../auth/auth.use-case';
export declare class UserUseCases {
    private userFactoryService;
    private dataServices;
    private authUseCases;
    constructor(userFactoryService: UserFactoryService, dataServices: IDataServices, authUseCases: AuthUseCases);
    getAllUsers(query: any, user: any): Promise<User[]>;
    getUserByEmailSenha(email: string, senha: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<{
        sub: string;
        nome: string;
        sobrenome: string;
        email: string;
        token: string;
        refreshToken: string;
    }>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User>;
}
