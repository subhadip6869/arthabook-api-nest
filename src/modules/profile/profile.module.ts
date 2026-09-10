import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { FinancialProfile } from './entities/financial_profile.entity';
import { FinancialProfileService } from './services/financial-profile.service';
import { FinancialProfileController } from './controllers/financial-profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, FinancialProfile])],
  controllers: [UserController, FinancialProfileController],
  providers: [UserService, FinancialProfileService],
})
export class ProfileModule {}
