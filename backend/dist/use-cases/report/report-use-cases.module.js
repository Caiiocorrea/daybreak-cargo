"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportUseCasesModule = void 0;
const data_services_module_1 = require("../../frameworks/data-services/data-services.module");
const report_google_sheets_use_case_1 = require("./report.google.sheets.use-case");
const report_month_use_case_1 = require("./report.month.use-case");
const common_1 = require("@nestjs/common");
let ReportUseCasesModule = class ReportUseCasesModule {
};
ReportUseCasesModule = __decorate([
    (0, common_1.Module)({
        imports: [data_services_module_1.DataServicesModule],
        providers: [report_month_use_case_1.ReportMonthUseCases, report_google_sheets_use_case_1.ReporGoogleSheetstUseCases],
        exports: [report_month_use_case_1.ReportMonthUseCases, report_google_sheets_use_case_1.ReporGoogleSheetstUseCases],
    })
], ReportUseCasesModule);
exports.ReportUseCasesModule = ReportUseCasesModule;
//# sourceMappingURL=report-use-cases.module.js.map