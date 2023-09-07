import { JwtAuthGuard } from '../use-cases/auth/guards/jwt-auth.guard';
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@Controller('taskbotmaster/whatsapp')
@ApiTags('service')
// @ApiBearerAuth('access-token')
// @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
export class ServiceController {
  accountSid = 'AC1b07342a8044f37e62e25a6b4eb7c329';
  authToken = 'c56e78282a1e784d81cb13d148cfcad0';

  constructor(
    // private readonly
  ) { }

  @Post('/')
  async receiveMessage(@Body() body: any, @Res() res: any) {
    const client = require('twilio')(this.accountSid, this.authToken);
    const { Body, From } = body

    console.log({ body })

    client.messages
      .create({
        body: `Oi, sou a assistente virtual da MOTOBOXE 👋`,
        to: From, // Text your number
        from: 'whatsapp:+14155238886', // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));

    client.messages
      .create({
        body: `Para continuar com seu atendimento, por favor, informe o departamento que deseja falar.`,
        to: From, // Text your number
        from: 'whatsapp:+14155238886', // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));

    client.messages
      .create({
        body: `1 - Comercial\n2 - Manutenção\n3 - Pós Venda`,
        to: From, // Text your number
        from: 'whatsapp:+14155238886', // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));

    return res.status(200)
  }

  // @Post('/')
  // async service1(@Body() body: any, @Res() res: any) {
  //   const client = require('twilio')(this.accountSid, this.authToken, {
  //     lazyLoading: false,
  //   });

  //   console.log('init');

  //   client.messages
  //     .create({
  //       body: 'Hello from twilio-node',
  //       to: 'whatsapp:+5527997851717', // Text your number
  //       from: 'whatsapp:+14155238886', // From a valid Twilio number
  //     })
  //     .then((message) => console.log(message.sid));

  //   console.log({ body, res })
  //   console.log(`Oi, sou a assistente virtual da MOTOBOXE 👋`)
  //   console.log(`Para continuar com seu atendimento, por favor, informe o departamento que deseja falar.`)
  //   console.log(`1 - Comercial\n2 - Manutenção\n3 - Pós Venda`)
  //   console.log({ optionSelected: `clicou no ${2}` })
  //   console.log()
  // }

  @Post('/department')
  async service2(/* @Query() query: any, @Res() user: any */) {
    console.log(`1 - Agendamento\n2 - Informações`)
    console.log({ optionSelected: `clicou no ${1}` })
    console.log()
  }

  @Post('/infos')
  async service3(/* @Query() query: any, @Res() user: any */) {
    console.log(`Por favor, digite o número da *MATRICULA* do seu veículo.`)
    console.log({ matricula: `${15646546554}` })
    console.log()
  }

  @Post('/schedule')
  async service4(/* @Query() query: any, @Res() user: any */) {
    const user = {
      name: 'João',
      email: 'joao@email.com',
      phone: '11999999999',
      matricula: '123456',
      modelo: 'CG 160',
      data_manutencao: '10/01/2023',
    }

    console.log(`${user.name}, localizei o seu cadastro. Por favor, informe a opção desejada.`)
    console.log(`1 - por tempo\n2 - por KM`)

    console.log({ optionSelected: `clicou no ${1}` })
    console.log('Aguarde um momento 🙂')

    let option = 1
    setTimeout(() => {
      const existDateMaintenance = true
      if (existDateMaintenance) {
        console.log(`Conforme o seu cadastro, a última manutenção foi realizada em ${user.data_manutencao}. Deseja confirmar essa data?`)
        console.log(`1 - Sim\n2 - Não`)
        let markOption = 1
        console.log({ optionSelected: `clicou no ${markOption}` })
        console.log()

        if (markOption === 1) {
          option = 3
        } else if (markOption === 2) {
          option = 1
        }
      }
    }, 1000)

    setTimeout(() => {
      if (option === 1) {
        console.log(`Qual a data da última manutenção?`)
      }
      else if (option === 2) {
        console.log(`Quanto KM rodado tem o seu veículo?`)
      }
      else if (option === 3) {
        console.log(`Selecione o mês que deseja realizar a manutenção.`)
        const month = [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
        ]

        for (let i = new Date().getMonth(); i < 12; i++) {
          console.log(`${i + 1} - ${month[i]}`)
        }
      }
      console.log({ optionSelected: `clicou no ${9}` })
      console.log()
    }, 2500)

    setTimeout(() => {
      console.log(`Por favor, informe o dia que deseja realizar a manutenção.`)
      console.log(`1 - 10\n2 - 20\n3 - 30`)
      console.log({ optionSelected: `clicou no ${1}` })
      console.log()
    }, 3500)

    setTimeout(() => {
      console.log(`Data selecionada sem horário disponível. Por favor, selecione outro dia.`)
      console.log(`1 - 20\n3 - 30`)
      console.log({ optionSelected: `clicou no ${2}` })
      console.log()
    }, 4500)

    setTimeout(() => {
      console.log(`Precisa de ajuda com algo mais?\n1 - Sim\n2 - Não\n3 - Voltar`)
      console.log({ optionSelected: `clicou no ${2}` })
      console.log()

      console.log(`Obrigado por utilizar o serviço de atendimento da MOTOBOXE. Tenha um ótimo dia!`)
      console.log()
      console.log(`A sua opinião é muito importante. Como você avalia este atendimento?\n5 - Ótimo\n4 - Bom\n3 - Regular\n2 - Ruim\n1 - Péssimo`)
      console.log({ optionSelected: `clicou no ${2}` })
      console.log()

      const resposta = 2

      if (resposta >= 3) {
        console.log(`Obrigado pelo seu feedback!`)
      } else {
        console.log(`Obrigado pelo seu feedback!`)
        console.log(`Por favor, nos diga o motivo pelo qual você não gostou do atendimento.`)
        console.log({ comment: `Não gostei do atendimento porque foi muito demorado.` })
        console.log()
      }
    }, 5500)

    setTimeout(() => {
      console.log(`Certo! Vou encerrar a conversa. Quando precisar, é só chamar 🙂`)
      console.log()
    }, 7500)
  }
}