import { CreateUserDto, UpdateUserDto } from '../core/dtos';
import { UserUseCases } from '../use-cases/user/user.use-case';
export declare class UserController {
    private userUseCases;
    constructor(userUseCases: UserUseCases);
    getAll(query: any, res: any): Promise<import("../core").User[]>;
    createUser(userDto: CreateUserDto): Promise<{
        sub: string;
        nome: string;
        sobrenome: string;
        email: string;
        token: string;
        refreshToken: string;
    }>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<import("../core").User>;
}
