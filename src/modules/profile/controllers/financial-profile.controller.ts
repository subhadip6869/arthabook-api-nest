import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/common/security/firebase-auth.guard';
import { FinancialProfileService } from '../services/financial-profile.service';
import { CurrentUser } from 'src/common/security/current-user.decorator';
import { FirebaseUserPrincipal } from 'src/common/security/firebase-user-principal';
import { FinancialProfile } from '../entities/financial_profile.entity';
import { UpdateFinancialProfileDto } from '../dto/update-financial-profile.dto';

@Controller({
  path: 'profile/financial',
  version: '1',
})
@UseGuards(FirebaseAuthGuard)
export class FinancialProfileController {
  constructor(
    private readonly financialProfileService: FinancialProfileService,
  ) {}

  @Get()
  async getFinancialProfile(
    @CurrentUser() principal: FirebaseUserPrincipal,
  ): Promise<FinancialProfile> {
    return this.financialProfileService.getByUserId(principal.uid);
  }

  @Put()
  async saveFinancialProfile(
    @CurrentUser() principal: FirebaseUserPrincipal,
    @Body() request: UpdateFinancialProfileDto,
  ): Promise<FinancialProfile> {
    return this.financialProfileService.saveFinancialProfile(
      principal.uid,
      request,
    );
  }
}
