"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportMonthUseCases = void 0;
const abstracts_1 = require("../../core/abstracts");
const common_1 = require("@nestjs/common");
const to_excel_1 = require("to-excel");
const uuidv4_1 = require("uuidv4");
let ReportMonthUseCases = class ReportMonthUseCases {
    constructor(dataServices) {
        this.dataServices = dataServices;
    }
    async reportDefaulth(dados) {
        const data = await dados.map((dados) => {
            return {
                Empresa: dados.empresa,
                Motorista: dados.motorista,
                Origem: dados.origem,
                Destino: dados.destino,
                Bloquinho: dados.bloquinho,
                KmCorrida: dados.kmCorrida,
                ValorCorrida: dados.valorCorrida,
                Status: dados.status === 'open' ? 'pendente' : 'concluído',
            };
        });
        const headers = [
            { label: 'Empresa', field: 'Empresa' },
            { label: 'Motorista', field: 'Motorista' },
            { label: 'Origem', field: 'Origem' },
            { label: 'Destino', field: 'Destino' },
            { label: 'Bloquinho', field: 'Bloquinho' },
            { label: 'KmCorrida', field: 'KmCorrida' },
            { label: 'ValorCorrida', field: 'ValorCorrida' },
            { label: 'Status', field: 'Status' },
        ];
        to_excel_1.toExcel.setReplace('Item 1 <br>', 'Item 1');
        const content = to_excel_1.toExcel.exportXLS(headers, data, 'filename');
        console.log(content);
        require('fs').writeFileSync('filename.xls', content);
    }
    async reportMonth(query, user) {
        console.log({ query, user });
        let dados = await this.dataServices.orders.getAll(query.page, query.limit, query, user);
        console.log(dados);
        await this.reportDefaulth(dados);
        let file = JSON.stringify(require('fs').readFileSync('filename.xls'));
        return {
            meta: {
                protocol: (0, uuidv4_1.uuid)(),
                evento: "Solicitação de relatório mensal",
                results: file
            }
        };
    }
};
ReportMonthUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [abstracts_1.IDataServices])
], ReportMonthUseCases);
exports.ReportMonthUseCases = ReportMonthUseCases;
//# sourceMappingURL=report.month.use-case.js.map