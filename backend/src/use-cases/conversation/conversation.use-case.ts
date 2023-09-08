import Conversation from 'src/frameworks/data-services/mysql/model/conversation.model';
import Declaration from 'src/frameworks/data-services/mysql/model/declaration.model';
import { twilioConfiguration } from 'src/configuration';
import { Inject, Injectable } from '@nestjs/common';
import moment from 'moment';


@Injectable()
export class ConversationUseCases {
  accountSid = twilioConfiguration.accountSid;
  authToken = twilioConfiguration.authToken;
  from: string = twilioConfiguration.from;
  client = require('twilio')(this.accountSid, this.authToken, {
    lazyLoading: true,
  })

  constructor(
    @Inject('CONVERSATION_REPOSITORY')
    private readonly conversationRepository: typeof Conversation,
    @Inject('DECLARATION_REPOSITORY')
    private readonly declarationRepository: typeof Declaration,
  ) { }

  async directMessage(body: any, res: any) {
    const { Body, From, WaId } = body

    let payloadApi = {
      body: Body,
      to: From,
      from: this.from,
    }

    let payloadBD = body

    const conversation = await this.conversationRepository
      .findOne({
        where: { WaId: WaId },
        order: [['created_at', 'DESC']],
        limit: 1,
      })

    let { Stage } = conversation

    console.log({ 
      Name: payloadBD.ProfileName,
      WaId: payloadBD.WaId,
      Body: payloadApi.body,
      Stage: Stage,
     })

    if ([
      'oi, tudo bem com você?', 'ola, tudo bem com você?', 'olá, tudo bem com você?',
      'oi, tudo bem com vc?', 'ola, tudo bem com vc?', 'olá, tudo bem com vc?',
      'oi', 'ola', 'olá', 'oi, tudo bem?', 'ola, tudo bem?', 'olá, tudo bem?',
      'oi, tudo bem', 'ola, tudo bem', 'olá, tudo bem',
      'oi tudo bem?', 'ola tudo bem?', 'olá tudo bem?',
      'OI', 'OLA', 'OLÁ', 'OI, TUDO BEM?', 'OLA, TUDO BEM?', 'OLÁ, TUDO BEM?',
      'Oi', 'Ola',
    ].includes(Body)) {
      return await this.receivedMessage(payloadApi, payloadBD)
    }
    else {
      switch (Stage) {
        case 'department':
          await this.department(payloadApi, payloadBD)
          break;
        case 'commercial':
          // await this.service3()
          break;
        case 'maintenance':
          await this.maintenance(payloadApi, payloadBD)
          break;
        case 'maintenanceResponse':
          await this.maintenanceResponse(payloadApi, payloadBD)
          break;
        case 'afterSales':
          // await this.receivedMessage(payloadApi, Body)
          break;
        case 'requestMatricula':
          await this.requestMatricula(payloadApi, payloadBD)
          break;
        case 'requestCustomer':
          await this.requestCustomer(payloadApi, payloadBD)
          break;
        case 'timeOrKm':
          await this.timeOrKm(payloadApi, payloadBD)
          break;
        case 'handleDate':
          await this.handleDate(payloadApi, payloadBD)
          break;
        case 'handleHour':
          await this.handleHour(payloadApi, payloadBD)
          break;
        case 'finishConversation':
          await this.finishConversation(payloadApi, payloadBD)
          break;
        default:
          await this.receivedMessage(payloadApi, payloadBD)
          break;
      }
    }
  }

  async receivedMessage(payloadApi: any, payloadBD: any) {
    // console.log({ payloadBD })

    await this.client.messages.create({
      ...payloadApi,
      body: `Oi, sou a assistente virtual da BOXE 👋`,
    })

    await this.client.messages.create({
      ...payloadApi,
      body: `Para continuar com seu atendimento, por favor, informe o departamento que deseja falar.`,
    })

    await this.client.messages.create({
      ...payloadApi,
      body: `*1* - Comercial\n*2* - Manutenção\n*3* - Pós Venda`,
    })

    payloadBD.Stage = 'department'
    return await this.conversationRepository.create(payloadBD)
  }

  async department(payloadApi: any, payloadBD: any) {
    // console.log({ payloadBD })

    if (payloadApi.body === '1') {
      payloadBD.Stage = 'commercial'
      await this.client.messages.create({
        ...payloadApi,
        body: `opção em desenvolvimento...`,
      })
    }
    if (payloadApi.body === '2') {
      payloadBD.Stage = 'maintenance'
      await this.client.messages.create({
        ...payloadApi,
        body: `*1* - Agendamento\n*2* - Informações`,
      })
    }
    if (payloadApi.body === '3') {
      payloadBD.Stage = 'afterSales'
      await this.client.messages.create({
        ...payloadApi,
        body: `opção em desenvolvimento...`,
      })
    }

    return await this.conversationRepository.create(payloadBD)
  }

  async maintenance(payloadApi: any, payloadBD: any) {
    // console.log({ payloadBD })
    await this.client.messages.create({
      ...payloadApi,
      body: `*1* - Manutenção programada\n*2* - Manutenção Reparação`,
    })

    payloadBD.Stage = 'maintenanceResponse'
    return await this.conversationRepository.create(payloadBD)
  }

  async maintenanceResponse(payloadApi: any, payloadBD: any) {
    // console.log({ payloadBD })

    if (payloadApi.body === '1') {
      return await this.requestMatricula(payloadApi, payloadBD)
    }

    if (payloadApi.body === '2') {
      await this.client.messages.create({
        ...payloadApi,
        body: `Opção em desenvolvimento...`,
      })

      payloadBD.Stage = 'maintenance'
      return await this.maintenance(payloadApi, payloadBD)
    }
  }

  async requestMatricula(payloadApi: any, payloadBD: any) {
    // console.log({ payloadBD })

    await this.client.messages.create({
      ...payloadApi,
      body: `Informe o número da *MATRICULA* do seu veículo.`,
    })

    payloadBD.Stage = 'requestCustomer'
    return await this.conversationRepository.create(payloadBD)
  }

  async requestCustomer(payloadApi: any, payloadBD: any) {
    // console.log({ payloadBD })

    if (payloadApi.body === '1') {
      payloadBD.Stage = 'timeOrKm'
      return await this.timeOrKm(payloadApi, payloadBD)
    }
    else if (payloadApi.body === '2') {
      payloadBD.Stage = 'requestCustomer'
      return await this.client.messages.create({
        ...payloadApi,
        body: `Qual a data da última manutenção?`,
      })
    }
    else if (['/'].includes(payloadApi.body)) {
      payloadBD.Stage = 'department'
      await this.receivedMessage(payloadApi, payloadBD)
    }

    //consultar dados antes de enviar mensagem(pendente)
    await this.declarationRepository.findOne({
      where: { Matricula: payloadApi.body },
      order: [['Data_reg', 'DESC']],
      attributes: ['Matricula', 'Data_Retoma'],
      limit: 1,
    }).then(async (dados) => {
      const dataReturn = moment(dados['dataValues'].Data_Retoma).format('DD/MM/YYYY')
      // console.log(dataReturn)

      if (dados.Data_Retoma) {
        payloadBD.Stage = 'requestCustomer'
        await this.client.messages.create({
          ...payloadApi,
          body: `${payloadBD.ProfileName.split(' ')[0]}, localizei o seu cadastro. De acordo com o veículo de matrícula ${dados.Matricula}, a última manutenção foi realizada em ${dataReturn}.\n\nDeseja confirmar essa data?\n1 - Sim\n2 - Não`,
        })
      } else if (!dados?.Data_Retoma) {
        await this.client.messages.create({
          ...payloadApi,
          body: `Não encontramos nenhum veículo com essa matrícula.\nPor favor, verifique se a matrícula está correta e tente novamente.`,
        })
        await this.requestMatricula(payloadApi, payloadBD)
      }

      return await this.conversationRepository.create(payloadBD)
    }).catch((error) => {
      console.log(error)
    })
  }

  async timeOrKm(payloadApi: any, payloadBD: any) {
    // console.log({ payloadBD })
    if (payloadApi.body === '1') {
      return await this.handleMonth(payloadApi, payloadBD)
    }
    if (payloadApi.body === '2') {
      return await this.handleKm(payloadApi, payloadBD)
    }

    await this.client.messages.create({
      ...payloadApi,
      body: `*1* - Manutenção por tempo\n*2* - Manutenção por KM`,
    })

    payloadBD.Stage = 'requestDataVehicle'
    return await this.conversationRepository.create(payloadBD)
  }

  async handleMonth(payloadApi: any, payloadBD: any) {
    // console.log({ payloadBD })

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

    let quickReplies = []

    for (let i = new Date().getMonth(); i < 12; i++) {
      quickReplies.push(`${i + 1} - ${month[i]}`)
    }

    await this.client.messages.create({
      ...payloadApi,
      body: `Selecione o mês que você deseja realizar a marcação`,
    })

    await this.client.messages.create({
      ...payloadApi,
      body: quickReplies.join('\n'),
      quickReplies: quickReplies.map((item) => {
        return { title: item, payload: item }
      }),
    })

    payloadBD.Stage = 'handleDate'
    return await this.conversationRepository.create(payloadBD)
  }

  async handleDate(payloadApi: any, payloadBD: any) {
    // console.log({ payloadBD })

    await this.client.messages.create({
      ...payloadApi,
      body: `Informe o dia que você deseja realizar a marcação`,
    })

    payloadBD.Stage = 'handleHour'
    return await this.conversationRepository.create(payloadBD)
  }

  async handleHour(payloadApi: any, payloadBD: any) {
    // console.log({ payloadBD })

    await this.client.messages.create({
      ...payloadApi,
      body: `Informe o horário que você deseja realizar a marcação`,
    })

    payloadBD.Stage = 'finishConversation'
    return await this.conversationRepository.create(payloadBD)
  }

  async handleKm(payloadApi: any, payloadBD: any) {
    // console.log({ payloadBD })

    await this.client.messages.create({
      ...payloadApi,
      body: `Informe a quilometragem do seu veículo.`,
    })

    payloadBD.Stage = 'finishConversation'
    return await this.conversationRepository.create(payloadBD)
  }

  async finishConversation(payloadApi: any, payloadBD: any) {
    // console.log({ payloadBD })

    await this.client.messages.create({
      ...payloadApi,
      body: `Sua marcação foi realizada com sucesso!`,
    })

    await this.client.messages.create({
      ...payloadApi,
      body: `Você receberá uma mensagem de confirmação com os dados da sua marcação.`,
    })

    await this.client.messages.create({
      ...payloadApi,
      body: `Obrigado por utilizar o nosso serviço de atendimento.\n\nTenha um ótimo dia!`,
    })

    payloadBD.Stage = 'default'
    return await this.conversationRepository.create(payloadBD)
  }
}
