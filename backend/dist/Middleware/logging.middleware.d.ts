import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from '@nestjs/jwt';
export declare class LoggingMiddleware implements NestMiddleware {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    use(req: Request, res: Response, next: NextFunction): void;
}
