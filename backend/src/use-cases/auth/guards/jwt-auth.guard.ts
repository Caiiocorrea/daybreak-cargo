import { LoggingMiddleware } from 'src/Middleware/logging.middleware';
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }