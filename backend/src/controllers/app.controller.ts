import { AuthUseCases } from '..//use-cases/auth/auth.use-case';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from '../core/dtos';

@Controller()
export class AppController {
  constructor(
    private authService: AuthUseCases
  ) { }

  @Get('status')
  @ApiTags('status')
  getHello(): {} {
    return { message: 'Daybreak Cargo executando com sucesso.' }
  }

  @Post('login')
  @ApiTags('auth')
  async signIn(@Body() user: AuthDto) {
    return await this.authService.signIn(user.email, user.senha)
  }
}