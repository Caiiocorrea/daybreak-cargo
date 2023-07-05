import { CreateUserDto, UpdateUserDto } from '../../core/dtos';
import { User } from '../../core/entities';
export declare class UserFactoryService {
    getAllUser(user: User): User[];
    createNewUser(createUserDto: CreateUserDto): User;
    updateUser(updateUserDto: UpdateUserDto): User;
}
