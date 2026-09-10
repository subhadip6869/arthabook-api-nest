import {
  AnnualIncomeRange,
  FinancialProfile,
  Occupation,
  RiskAppetite,
} from '../entities/financial_profile.entity';

export class FinancialProfileResponseDto {
  userId!: string;
  occupation!: Occupation | null;
  annualIncomeRange!: AnnualIncomeRange | null;
  riskAppetite!: RiskAppetite | null;
  baseCurrency!: string;

  constructor(profile: FinancialProfile) {
    this.userId = profile.userId;
    this.occupation = profile.occupation;
    this.annualIncomeRange = profile.annualIncomeRange;
    this.riskAppetite = profile.riskAppetite;
    this.baseCurrency = profile.baseCurrency;
  }
}
