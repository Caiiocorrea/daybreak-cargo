import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../../core/dtos';
import { UserFactoryService } from './user-factory.service';
import { User, Vehicle } from '../../core/entities/index';
import { IDataServices } from '../../core/abstracts';
import { AuthUseCases } from '../auth/auth.use-case';
import { UserEnum } from 'src/core/enum/userEnum';

@Injectable()
export class UserUseCases {
  constructor(
    private userFactoryService: UserFactoryService,
    private dataServices: IDataServices,
    private authUseCases: AuthUseCases,
  ) { }

  async getAllUsers(query: any, user: any): Promise<User[]> {
    let users: User[] = []
    users = await this.dataServices.users.getAll(query.page, query.limit, query, user);
    users[0].veiculos = await this.dataServices.vehicles.getAll(query.page, query.limit, users[0].veiculos[0], {})
    if (!users) throw new BadRequestException({ message: UserEnum.allnotFound })
    return this.userFactoryService.getAllUser(users[0])
  }

  // async getUserById(id: any): Promise<User> {
  //   const user = await this.dataServices.users.get(id);
  //   if (!user) throw new BadRequestException(UserEnum.notFound)
  //   return user
  // }

  async getUserByEmailSenha(email: string, senha: string): Promise<User> {
    const users = await this.dataServices.users.getOne(email, senha)
    if (!users) throw new BadRequestException(UserEnum.notFound)
    return users
  }

  async getUserByEmail(email: string): Promise<User> {
    const users = await this.dataServices.users.getEmail(email)
    if (!users) throw new BadRequestException(UserEnum.notFound)
    return users
  }

  async createUser(createUserDto: CreateUserDto) {
    const userExists = await this.dataServices.users.getEmail(createUserDto.email);
    if (userExists) throw new BadRequestException(UserEnum.exist);
    const hash = await this.authUseCases.hashData(createUserDto.senha);
    const userParse: any = this.userFactoryService.createNewUser({ ...createUserDto, senha: hash });
    const newVehicle: Vehicle = await this.dataServices.vehicles.create(userParse.veiculos[0]);
    const newUser: User = await this.dataServices.users.create({ ...userParse, veiculos: [{ _id: newVehicle._id }] });
    return this.authUseCases.getTokens(newUser)
  }

  updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.userFactoryService.updateUser(updateUserDto);
    return this.dataServices.users.update(userId, user);
  }
}