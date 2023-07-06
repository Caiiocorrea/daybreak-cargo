import { passengersProviders } from '../../frameworks/data-services/mysql/passengers.provedores';
import { vehiclesProviders } from '../../frameworks/data-services/mysql/vehicles.provedores';
import { usersProviders } from '../../frameworks/data-services/mysql/users.provedores';
import { AuthUseCasesModule } from '../auth/auth-use-cases.module';
import { UserUseCases } from './user.use-case';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthUseCasesModule],
  providers: [
    UserUseCases,
    ...usersProviders,
    ...passengersProviders,
    ...vehiclesProviders
  ],
  exports: [UserUseCases],
})
export class UserUseCasesModule { }
