import { DataServicesModule } from '../../frameworks/data-services/data-services.module';
import { usersProviders } from '../../frameworks/data-services/mysql/users.provedores';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthUseCases } from './auth.use-case';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataServicesModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn:  process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [
    AuthUseCases,
    LocalStrategy,
    JwtStrategy,
    ...usersProviders
  ],
  exports: [AuthUseCases, JwtModule],
})
export class AuthUseCasesModule { }
