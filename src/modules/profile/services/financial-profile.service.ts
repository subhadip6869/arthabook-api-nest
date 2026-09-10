import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialProfile } from '../entities/financial_profile.entity';
import { Repository } from 'typeorm';
import { ResourceNotFoundException } from 'src/common/exceptions/resource-not-found.exception';
import { UpdateFinancialProfileDto } from '../dto/update-financial-profile.dto';

@Injectable()
export class FinancialProfileService {
  constructor(
    @InjectRepository(FinancialProfile)
    private readonly financialProfileRepo: Repository<FinancialProfile>,
  ) {}

  async getByUserId(userId: string): Promise<FinancialProfile> {
    const profile = await this.financialProfileRepo.findOne({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new ResourceNotFoundException('Financial profile not found');
    }

    return profile;
  }

  async saveFinancialProfile(
    userId: string,
    dto: UpdateFinancialProfileDto,
  ): Promise<FinancialProfile> {
    const existingProfile = await this.financialProfileRepo.findOne({
      where: {
        userId,
      },
    });

    if (!existingProfile) {
      const profile = this.financialProfileRepo.create({
        userId,
        occupation: dto.occupation ?? null,
        annualIncomeRange: dto.annualIncomeRange ?? null,
        riskAppetite: dto.riskAppetite ?? null,
        baseCurrency: dto.baseCurrency?.toUpperCase() ?? 'INR',
      });

      return this.financialProfileRepo.save(profile);
    }

    if (dto.occupation !== undefined) {
      existingProfile.occupation = dto.occupation;
    }

    if (dto.annualIncomeRange !== undefined) {
      existingProfile.annualIncomeRange = dto.annualIncomeRange;
    }

    if (dto.riskAppetite !== undefined) {
      existingProfile.riskAppetite = dto.riskAppetite;
    }

    if (dto.baseCurrency !== undefined) {
      existingProfile.baseCurrency = dto.baseCurrency?.toUpperCase() ?? 'INR';
    }

    return this.financialProfileRepo.save(existingProfile);
  }
}
