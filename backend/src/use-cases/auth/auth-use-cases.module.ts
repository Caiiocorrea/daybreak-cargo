import { DataServicesModule } from '../../frameworks/data-services/data-services.module';
import { usersProviders } from '../../frameworks/data-services/mysql/users.provedores';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JWT_CONFIGURATION } from './constants';
import { AuthUseCases } from './auth.use-case';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataServicesModule,
    JwtModule.register({
      privateKey: JWT_CONFIGURATION.secret,
      signOptions: { expiresIn: JWT_CONFIGURATION.expiresIn },
    }),
  ],
  providers: [
    AuthUseCases,
    LocalStrategy,
    JwtStrategy,
    ...usersProviders,
  ],
  exports: [AuthUseCases, JwtModule],
})
export class AuthUseCasesModule { }
