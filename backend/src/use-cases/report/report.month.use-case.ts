// import Passengers from '../../frameworks/data-services/mysql/model/passengers.model';
// import Order from '../../frameworks/data-services/mysql/model/orders.model';
// import { Inject, Injectable } from '@nestjs/common';
// import { toExcel } from 'to-excel';
// import { uuid } from 'uuidv4';

// @Injectable()
// export class ReportMonthUseCases {
//   constructor(
//     // private dataServices: IDataServices
//     @Inject('PASSENGERS_REPOSITORY') private passengersRepository: typeof Passengers,
//     @Inject('ORDERS_REPOSITORY') private orderRepository: typeof Order,
//   ) { }

//   async reportDefaulth(dados: any[]) {
//     // set data
//     const data = await dados.map((dados) => {
//       return {
//         Empresa: dados.empresa,
//         Motorista: dados.motorista,
//         Origem: dados.origem,
//         Destino: dados.destino,
//         Bloquinho: dados.bloquinho,
//         KmCorrida: dados.kmCorrida,
//         ValorCorrida: dados.valorCorrida,
//         Status: dados.status === 'open' ? 'pendente' : 'concluído',
//       }
//     })

//     const headers = [
//       { label: 'Empresa', field: 'Empresa' },
//       { label: 'Motorista', field: 'Motorista' },
//       { label: 'Origem', field: 'Origem' },
//       { label: 'Destino', field: 'Destino' },
//       { label: 'Bloquinho', field: 'Bloquinho' },
//       { label: 'KmCorrida', field: 'KmCorrida' },
//       { label: 'ValorCorrida', field: 'ValorCorrida' },
//       { label: 'Status', field: 'Status' },
//     ]

//     toExcel.setReplace('Item 1 <br>', 'Item 1')
//     const content = toExcel.exportXLS(headers, data, 'filename');
//     console.log(content)
//     require('fs').writeFileSync('filename.xls', content);
//   }

//   async reportMonth(query: any, user: any): Promise<any> {
//     console.log({ query, user })
//     let dados = await this.dataServices.orders.getAll(query.page, query.limit, query, user)
//     console.log(dados)
//     await this.reportDefaulth(dados)
//     let file = JSON.stringify(require('fs').readFileSync('filename.xls'))
//     return {
//       meta: {
//         protocol: uuid(),
//         evento: "Solicitação de relatório mensal",
//         results: file
//       }
//     }
//   }
// }
