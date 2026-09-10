import { IsEnum, IsISO4217CurrencyCode, IsOptional } from 'class-validator';
import {
  AnnualIncomeRange,
  Occupation,
  RiskAppetite,
} from '../entities/financial_profile.entity';

export class UpdateFinancialProfileDto {
  @IsOptional()
  @IsEnum(Occupation)
  occupation?: Occupation | null;

  @IsOptional()
  @IsEnum(AnnualIncomeRange)
  annualIncomeRange?: AnnualIncomeRange | null;

  @IsOptional()
  @IsEnum(RiskAppetite)
  riskAppetite?: RiskAppetite | null;

  @IsOptional()
  @IsISO4217CurrencyCode()
  baseCurrency?: string | null;
}
