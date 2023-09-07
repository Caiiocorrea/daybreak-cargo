import Vehicle from '../../frameworks/data-services/mysql/model/vehicles.model';
import User from '../../frameworks/data-services/mysql/model/users.model';
import { CreateUserDto, UpdateUserDto } from '../../core/dtos';
import { AuthUseCases } from '../auth/auth.use-case';
export declare class UserUseCases {
    private userRepository;
    private vehicleRepository;
    private authUseCases;
    constructor(userRepository: typeof User, vehicleRepository: typeof Vehicle, authUseCases: AuthUseCases);
    getAllUsers(query: any, user: any): Promise<any[]>;
    getUserByEmailSenha(email: string, senha: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    createUser(createUserDto: CreateUserDto, user: any): Promise<void>;
    updateUser(userId: string, updateUserDto: UpdateUserDto, user: any): Promise<void>;
}
