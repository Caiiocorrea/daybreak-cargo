import Conversation from '../../frameworks/data-services/mysql/model/conversation.model';
import { twilioConfiguration } from 'src/configuration';
import { Inject, Injectable } from '@nestjs/common';


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
    private conversationRepository: typeof Conversation,
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

    console.log({ conversation: conversation?.Stage })

    let { Stage } = conversation ?? { Stage: '' }

    if ([
      'oi', 'Oi', 'oI', 'OI',
      'olá', 'Olá', 'oLá', 'OLá', 'oLA', 'OLA', 'olA', 'OLa',
      'hello', 'Hello', 'hEllo', 'heLlo', 'helLo', 'hellO', 'HELLO', 'hELLO', 'heLLO', 'helLO',
      'hi', 'Hi', 'hI', 'HI',
      'eae', 'Eae', 'eAe', 'EAe', 'eAE', 'EAE', 'eaE', 'EaE',
      'eai', 'Eai', 'eAi', 'EAi', 'eAI', 'EAI', 'eaI', 'EaI',
    ].includes(Body)) {
      Stage = ''
    }

    console.log({ Stage })

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
      default:
        payloadBD.Stage = 'department'
        await this.receivedMessage(payloadApi, payloadBD)
        break;
    }
  }

  async receivedMessage(payloadApi: any, payloadBD: any) {
    console.log({ payloadApi, payloadBD })

    await this.client.messages.create({
      ...payloadApi,
      body: `Oi, sou a assistente virtual da MOTOBOXE 👋`,
    })

    await this.client.messages.create({
      ...payloadApi,
      body: `Para continuar com seu atendimento, por favor, informe o departamento que deseja falar.`,
    })

    await this.client.messages.create({
      ...payloadApi,
      body: `1 - Comercial\n2 - Manutenção\n3 - Pós Venda`,
    })

    return await this.conversationRepository.create(payloadBD)
  }

  async department(payloadApi: any, payloadBD: any) {
    console.log({ payloadApi, payloadBD })
    const message = `1 - Agendamento\n2 - Informações`

    if (payloadApi.body === '1') {
      payloadBD.Stage = 'commercial'
      await this.client.messages.create({
        ...payloadApi,
        body: `opção em desenvolvimento...\n\n 0 - Voltar`,
      })
    }
    if (payloadApi.body === '2') {
      payloadBD.Stage = 'requestMatricula'
      await this.client.messages.create({
        ...payloadApi,
        body: `1 - Agendamento\n2 - Informações`,
      })
    }
    if (payloadApi.body === '3') {
      payloadBD.Stage = 'afterSales'
      await this.client.messages.create({
        ...payloadApi,
        body: `1 - Agendamento\n2 - Informações`,
      })
    }

    return await this.conversationRepository.create(payloadBD)
  }

  async maintenance(payloadApi: any, payloadBD: any) {
    console.log({ payloadApi, payloadBD })

    if (payloadApi.Body === '1') {
      await this.client.messages.create({
        ...payloadApi,
        body: `1 - Manutenção programada\n2 - Manutenção Reparação`,
      })

      payloadBD.Stage = 'requestMatricula'
      return await this.conversationRepository.create(payloadBD)
    }

    if (payloadApi.Body === '2') {
      await this.client.messages.create({
        ...payloadApi,
        body: `Opção em desenvolvimento...`,
      })

      payloadBD.Stage = 'requestMatricula'
      return await this.conversationRepository.create(payloadBD)
    }
  }

  async requestMatricula(payloadApi: any, payloadBD: any) {
    console.log({ payloadApi, payloadBD })

    await this.client.messages.create({
      ...payloadApi,
      body: `Informe o número da *MATRICULA* do seu veículo.`,
    })

    payloadBD.Stage = 'requestCustomer'
    return await this.conversationRepository.create(payloadBD)
  }

  async requestCustomer(payloadApi: any, payloadBD: any) {
    console.log({ payloadApi, payloadBD })

    //consultar dados antes de enviar mensagem(pendente)
    const dados = 1

    if (dados === 1) {
      await this.client.messages.create({
        ...payloadApi,
        body: `Conforme o seu cadastro, a última manutenção foi realizada em 01/09/2023.\nDeseja confirmar essa data?\n\n\n1 - Sim\n2 - Não`,
      })
    }
    
    payloadBD.Stage = 'timeOrKm'
    return await this.conversationRepository.create(payloadBD)
  }

  async timeOrKm(payloadApi: any, payloadBD: any) {
    console.log({ payloadApi, payloadBD })

    await this.client.messages.create({
      ...payloadApi,
      body: `1 - Manutenção por tempo\n2 - Manutenção por KM`,
    })

    //Consultar dados do cliente, se existir data de manutenção, enviar mensagem(pendente)
    //Se não existir data de manutenção, enviar formulário para o cliente informar a data da última manutenção(pendente)

    payloadBD.Stage = 'requestDataVehicle'
    return await this.conversationRepository.create(payloadBD)
  }
}
