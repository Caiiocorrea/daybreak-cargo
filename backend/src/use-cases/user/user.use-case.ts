import Passengers from '../../frameworks/data-services/mysql/model/passengers.model';
import Vehicle from '../../frameworks/data-services/mysql/model/vehicles.model';
import User from '../../frameworks/data-services/mysql/model/users.model';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../../core/dtos';
import { AuthUseCases } from '../auth/auth.use-case';
import { UserEnum } from 'src/core/enum/userEnum';

@Injectable()
export class UserUseCases {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
    @Inject('VEHICLE_REPOSITORY') private vehicleRepository: typeof Vehicle,
    private authUseCases: AuthUseCases,
  ) { }

  async getAllUsers(query: any, user: any) {
    const regexFilter = {};
    let result: any[] = [];

    if (query._id) {
      regexFilter['user_id'] = user.locals.user.user_id;
      regexFilter['id'] = query._id;
      result[0] = await this.userRepository.findByPk(regexFilter['id'])
    }

    if (!query._id) {
      for (const key in query) {
        if (query.hasOwnProperty(key)) {
          regexFilter[key] = new RegExp(query[key], 'i');
          delete regexFilter['offset'];
          delete regexFilter['limit'];
        }
      }
      result = await this.userRepository.findAll({
        where: regexFilter,
        offset: Number(query.offset),
        limit: Number(query.limit),
        include: [{ all: true, nested: true }],
        attributes: { exclude: ['senha'] }
      })
    }

    return result ?? [];
  }

  async getUserByEmailSenha(email: string, senha: string) {
    const users = await this.userRepository.findOne({ where: { email, senha } })
    if (!users) throw new BadRequestException(UserEnum.notFound)
    return users
  }

  async getUserByEmail(email: string) {
    const users = await this.userRepository.findOne({ where: { email } })
    if (!users) throw new BadRequestException(UserEnum.notFound)
    return users
  }

  async createUser(createUserDto: CreateUserDto, user: any) {
    const userExists = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (userExists) throw new BadRequestException(UserEnum.exist);
    await this.userRepository.create({
      ...createUserDto,
      senha: await this.authUseCases.hashData(createUserDto.senha)
    }).then(async (newUser) => {
      createUserDto.veiculos.map(async (dados: Vehicle) => {
        await this.vehicleRepository.create({ ...dados, user_id: newUser.id })
      })
    }).catch((err) => { throw new BadRequestException(err) })
  }

  updateUser(userId: string, updateUserDto: UpdateUserDto, user: any) {
    return this.userRepository.update(updateUserDto, { where: { id: userId } }).then(async (updatedUser) => {
      if (updatedUser[0] === 0) throw new BadRequestException(UserEnum.notFound);
      updateUserDto.veiculos.map(async (dados: Vehicle) => {
        await this.vehicleRepository.update(dados, { where: { id: dados.id } })
      })
    }).catch((err) => { throw new BadRequestException(err) })
  }
}