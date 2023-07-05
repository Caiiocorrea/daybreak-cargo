import { DataServicesModule } from '../../services/data-services/data-services.module';
import { UserFactoryService } from './user-factory.service';
import { UserUseCases } from './user.use-case';
import { Module } from '@nestjs/common';
import { AuthUseCasesModule } from '../auth/auth-use-cases.module';

@Module({
  imports: [DataServicesModule, AuthUseCasesModule],
  providers: [UserFactoryService, UserUseCases],
  exports: [UserFactoryService, UserUseCases],
})
export class UserUseCasesModule {}
