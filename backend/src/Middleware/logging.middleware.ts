import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { TokenEnum } from "../core/enum/tokenEnum";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new UnauthorizedException(TokenEnum.notfound);
        try {
            let decoded = this.jwtService.decode(req.headers['authorization'].split(' ')[1]);
            res.locals.user = decoded
            next();
        } catch (error) {
            throw new UnauthorizedException(TokenEnum.invalid);
        }
    }
}