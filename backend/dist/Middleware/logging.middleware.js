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
exports.LoggingMiddleware = void 0;
const common_1 = require("@nestjs/common");
const tokenEnum_1 = require("../core/enum/tokenEnum");
const jwt_1 = require("@nestjs/jwt");
let LoggingMiddleware = class LoggingMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    use(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            throw new common_1.UnauthorizedException(tokenEnum_1.TokenEnum.notfound);
        try {
            let decoded = this.jwtService.decode(req.headers['authorization'].split(' ')[1]);
            res.locals.user = decoded;
            next();
        }
        catch (error) {
            throw new common_1.UnauthorizedException(tokenEnum_1.TokenEnum.invalid);
        }
    }
};
LoggingMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], LoggingMiddleware);
exports.LoggingMiddleware = LoggingMiddleware;
//# sourceMappingURL=logging.middleware.js.map