import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  
  constructor() { }

  @Get('status')
  @ApiTags('status')
  getHello(): {} {
    return { message: 'TaskBotMaster executando com sucesso.' }
  }
}