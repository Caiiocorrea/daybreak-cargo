import { Controller, Get, Param, Post, Body, Put, UseGuards, Query, UsePipes, Res } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, userSchema } from '../core/dtos';
import { JwtAuthGuard } from '../use-cases/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '../pipes/JoiValidationPipe';
import { UserUseCases } from '../use-cases/user/user.use-case';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), JwtAuthGuard)
export class UserController {
  constructor(private userUseCases: UserUseCases) { }

  @Get()
  @ApiQuery({ name: 'sobrenome', type: String, required: false })
  @ApiQuery({ name: 'nome', type: String, required: false })
  @ApiQuery({ name: 'email', type: String, required: false })
  @ApiQuery({ name: '_id', type: String, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'offset', type: Number, required: false })
  @UsePipes(new JoiValidationPipe(userSchema))
  async getAll(@Query() query: any, @Res() res: any) {
    const users = await this.userUseCases.getAllUsers(query, res.locals.user);
    return res.status(200).send(users);
  }

  @Post()
  async createUser(
    @Body() userDto: CreateUserDto,
    @Res() res: any
  ) {
    const user = await this.userUseCases.createUser(userDto, res.locals.user);
    return res.status(201).send(user);
  }

  @Put(':id')
  updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: any
  ) {
    const user = this.userUseCases.updateUser(userId, updateUserDto, res.locals.user);
    return res.status(200).send(user);
  }
}