import { CreateUserDto, UpdateUserDto } from '../core/dtos';
import { UserUseCases } from '../use-cases/user/user.use-case';
export declare class UserController {
    private userUseCases;
    constructor(userUseCases: UserUseCases);
    getAll(query: any, res: any): Promise<any>;
    createUser(userDto: CreateUserDto, res: any): Promise<any>;
    updateUser(userId: string, updateUserDto: UpdateUserDto, res: any): any;
}
