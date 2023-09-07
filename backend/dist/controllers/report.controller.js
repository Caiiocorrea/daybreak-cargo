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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const report_google_sheets_use_case_1 = require("../use-cases/report/report.google.sheets.use-case");
const jwt_auth_guard_1 = require("../use-cases/auth/guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let ReportController = class ReportController {
    constructor(reporGoogleSheetstUseCases) {
        this.reporGoogleSheetstUseCases = reporGoogleSheetstUseCases;
    }
    async reportSheets(res) {
        const report = await this.reporGoogleSheetstUseCases.reportGoogleSheets(res.locals.user);
        return res.status(200).send(report);
    }
};
__decorate([
    (0, common_1.Get)('/reportsheets'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "reportSheets", null);
ReportController = __decorate([
    (0, common_1.Controller)('report'),
    (0, swagger_1.ApiTags)('report'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [report_google_sheets_use_case_1.ReporGoogleSheetstUseCases])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map