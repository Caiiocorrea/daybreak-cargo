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
exports.ReporGoogleSheetstUseCases = void 0;
const google_spreadsheet_1 = require("google-spreadsheet");
const abstracts_1 = require("../../core/abstracts");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const moment = require("moment");
let sheet;
let ReporGoogleSheetstUseCases = class ReporGoogleSheetstUseCases {
    constructor(dataServices) {
        this.dataServices = dataServices;
    }
    parsePassageiro(passageiros) {
        let newPassageiros = [];
        const passageiro = passageiros.map(({ passageiro }) => passageiro);
        newPassageiros.push(...passageiro);
        return `${passageiro} `;
    }
    prepareNameMonth(month) {
        let newMonth;
        switch (month) {
            case 0:
                newMonth = 'JANEIRO';
                break;
            case 1:
                newMonth = 'FEVEREIRO';
                break;
            case 2:
                newMonth = 'MARÇO';
                break;
            case 3:
                newMonth = 'ABRIL';
                break;
            case 4:
                newMonth = 'MAIO';
                break;
            case 5:
                newMonth = 'JUNHO';
                break;
            case 6:
                newMonth = 'JULHO';
                break;
            case 7:
                newMonth = 'AGOSTO';
                break;
            case 8:
                newMonth = 'SETEMBRO';
                break;
            case 9:
                newMonth = 'OUTUBRO';
                break;
            case 10:
                newMonth = 'NOVEMBRO';
                break;
            case 11:
                newMonth = 'DEZEMBRO';
                break;
            default:
                break;
        }
        return newMonth;
    }
    async getDoc(user) {
        const doc = new google_spreadsheet_1.GoogleSpreadsheet(process.env.docId);
        doc.useServiceAccountAuth({
            client_email: process.env.client_email,
            private_key: process.env.private_key.replace(/\\n/g, '\n')
        });
        await doc.loadInfo();
        sheet = doc.sheetsByIndex[0];
        await sheet.clearRows({ start: 4 });
        await sheet.loadCells('A1:L1');
        const a1 = sheet.getCell(0, 0);
        a1.value = `PLANILHA DE KM MATRIZ - ${this.prepareNameMonth(moment().month())} ${moment().format('YYYY')}`;
        await sheet.saveUpdatedCells();
        await sheet.loadHeaderRow(3);
        await sheet.getRows();
        const dados = await this.dataServices.orders.getAll(0, 100, {}, user);
        let dadosPlanilha = [];
        for (let i in dados) {
            dadosPlanilha.push({
                'EMPRESA': dados[i].empresa,
                'CENTRO DE CUSTO (Suzano / Imetame)': '',
                'Nº DO CAP (Suzano)': '',
                'DATA': moment(Date.now()).format('DD-MM-YYYY'),
                'NOME DO TAXISTA COOPERADO': dados[i].motorista,
                'ORIGEM': dados[i].origem,
                'DESTINO': dados[i].destino,
                'HORARIO DE SAÍDA': moment(Date.now()).format('HH:mm'),
                'KM': dados[i].kmCorrida,
                'NOME COMPLETO DO PASSAGEIRO': this.parsePassageiro(dados[i].passageiros),
                'Nº DE PASSAGEIROS': dados[i].passageiros.length,
                'VALOR': dados[i].valorCorrida
            });
        }
        await sheet.addRows([...dadosPlanilha]);
        return doc;
    }
    async reportGoogleSheets(user) {
        return this.getDoc(user).then(async (doc) => {
            return {
                Protocol: (0, uuid_1.v4)(),
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
        return { url, filePath };
    }
};
ReporGoogleSheetstUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [abstracts_1.IDataServices])
], ReporGoogleSheetstUseCases);
exports.ReporGoogleSheetstUseCases = ReporGoogleSheetstUseCases;
//# sourceMappingURL=report.google.sheets.use-case.js.map