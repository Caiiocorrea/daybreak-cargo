import Passengers from '../../frameworks/data-services/mysql/model/passengers.model';
import Order from '../../frameworks/data-services/mysql/model/orders.model';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Inject, Injectable } from '@nestjs/common';
// import { createWriteStream } from 'fs';
import { v4 as uuid_v4 } from "uuid";
import * as moment from 'moment';
// import axios from 'axios';


let sheet: any
@Injectable()
export class ReporGoogleSheetstUseCases {
  constructor(
    @Inject('PASSENGERS_REPOSITORY') private passengersRepository: typeof Passengers,
    @Inject('ORDERS_REPOSITORY') private orderRepository: typeof Order,
  ) { }


  parsePassageiro(passageiros: any) {
    let newPassageiros: any = []
    const passageiro = passageiros.map(({ nome }) => nome)
    newPassageiros.push(...passageiro)
    return `${passageiro} `
  }

  prepareNameMonth(month: number) {
    let newMonth: string
    switch (month) {
      case 0:
        newMonth = 'JANEIRO'
        break;
      case 1:
        newMonth = 'FEVEREIRO'
        break;
      case 2:
        newMonth = 'MARÇO'
        break;
      case 3:
        newMonth = 'ABRIL'
        break;
      case 4:
        newMonth = 'MAIO'
        break;
      case 5:
        newMonth = 'JUNHO'
        break;
      case 6:
        newMonth = 'JULHO'
        break;
      case 7:
        newMonth = 'AGOSTO'
        break;
      case 8:
        newMonth = 'SETEMBRO'
        break;
      case 9:
        newMonth = 'OUTUBRO'
        break;
      case 10:
        newMonth = 'NOVEMBRO'
        break;
      case 11:
        newMonth = 'DEZEMBRO'
        break;

      default:
        break;
    }
    return newMonth
  }

  async getDoc(user: any) {
    const doc = new GoogleSpreadsheet(process.env.docId);
    doc.useServiceAccountAuth({
      client_email: process.env.client_email,
      private_key: process.env.private_key.replace(/\\n/g, '\n')
    });
    await doc.loadInfo();// Carrega as informações da planilha
    sheet = doc.sheetsByIndex[0];// Acessa a primeira planilha
    await sheet.clearRows({ start: 4 })//Limpa a planilha a partir da linha 4
    await sheet.loadCells('A1:L1');//Verifica total colunas
    const a1 = sheet.getCell(0, 0);//Acessa a primeira linha
    a1.value = `PLANILHA DE KM MATRIZ - ${this.prepareNameMonth(moment().month())} ${moment().format('YYYY')}`;
    await sheet.saveUpdatedCells()//Salva a primeira linha
    await sheet.loadHeaderRow(3)//Acessa a terceira linha
    await sheet.getRows()//Acessa todas as linhas
    const dados = await this.orderRepository.findAndCountAll({
      where: { user_id: user.user_id },
      // order: [['created_at', 'DESC']],
      include: [{ model: this.passengersRepository }],
    })

    let dadosPlanilha: any = []
    for (let i in dados.rows) {
      // console.log({ dados: dados.rows[i] })
      dadosPlanilha.push({
        'EMPRESA': dados.rows[i].empresa,
        'CENTRO DE CUSTO (Suzano / Imetame)': '',
        'Nº DO CAP (Suzano)': dados.rows[i].numero_cap,
        'DATA': moment(Date.now()).format('DD-MM-YYYY'),
        'NOME DO TAXISTA COOPERADO': dados.rows[i].motorista,
        'ORIGEM': dados.rows[i].origem,
        'DESTINO': dados.rows[i].destino,
        'HORARIO DE SAÍDA': moment(Date.now()).format('HH:mm'),
        'KM': '',
        'NOME COMPLETO DO PASSAGEIRO': this.parsePassageiro(dados.rows[i].passengers),
        'Nº DE PASSAGEIROS': dados.rows[i].passengers.length,
        'VALOR': dados.rows[i].valorCorrida
      })
    }
    await sheet.addRows([...dadosPlanilha])
    return doc
  }

  async reportGoogleSheets(user: any): Promise<any> {
    return this.getDoc(user).then(async (doc: any) => {
      return {
        Protocol: uuid_v4(),
        event: 'Solicitação de relatório',
        message: `executado em ${doc.title} ${this.prepareNameMonth(moment().month())} ${moment().format('YYYY')} `,
        link_download: (await this.downloadAsXLSX()).url,
      };
    }).catch(e => {
      console.error(e);
      return e;
    });
  }

  async downloadAsXLSX() {
    const url = `https://docs.google.com/feeds/download/spreadsheets/Export?key=${process.env.docId}&exportFormat=xlsx`;
    const filePath = `PLANILHA-DE-KM-MATRIZ-${this.prepareNameMonth(moment().month())} ${moment().format('YYYY')}.xlsx`;
    return { url, filePath }

    //SALVA O ARQUIVO NA PASTA INFORMADA
    // const writer = createWriteStream(filePath);
    // const response = await axios.get(url, { responseType: 'stream' });
    // response.data.pipe(writer);
    // return new Promise((resolve, reject) => {
    //   writer.on('finish', resolve);
    //   writer.on('error', reject);
    // })

    //RETORNA O ARQUIVO EM BASE64
    // const response = await axios.get(url, { responseType: 'arraybuffer' });
    // return Buffer.from(response.data, 'binary');
  }
}
