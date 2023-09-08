import { ConversationUseCases } from 'src/use-cases/conversation/conversation.use-case';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@Controller('taskbotmaster/whatsapp')
@ApiTags('service')
export class ServiceController {

  constructor(
    private readonly conversationService: ConversationUseCases
  ) { }

  @Post('/')
  async receiveMessage(@Body() body: any, @Res() res: any) {
    await this.conversationService.directMessage(body, res)
    return res.status(200)
  }
}