import { Entity, JoinColumn, OneToOne, PrimaryColumn, Column } from 'typeorm';
import { User } from './user.entity';

export enum Occupation {
  SALARIED = 'SALARIED',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  BUSINESS = 'BUSINESS',
  RETIRED = 'RETIRED',
  STUDENT = 'STUDENT',
  OTHER = 'OTHER',
}

export enum AnnualIncomeRange {
  BELOW_3L = 'BELOW_3L',
  FROM_3L_TO_6L = 'FROM_3L_TO_6L',
  FROM_6L_TO_12L = 'FROM_6L_TO_12L',
  FROM_12L_TO_25L = 'FROM_12L_TO_25L',
  ABOVE_25L = 'ABOVE_25L',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export enum RiskAppetite {
  CONSERVATIVE = 'CONSERVATIVE',
  MODERATE = 'MODERATE',
  AGGRESSIVE = 'AGGRESSIVE',
}

@Entity({ name: 'financial_profiles', schema: 'profile' })
export class FinancialProfile {
  @PrimaryColumn({
    name: 'user_id',
    type: 'varchar',
    length: 128,
  })
  userId!: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'userId',
    foreignKeyConstraintName: 'fk_financial_profiles_user',
  })
  user!: User;

  @Column({
    name: 'occupation',
    type: 'enum',
    enum: Occupation,
    enumName: 'occupation',
    nullable: true,
  })
  occupation!: Occupation | null;

  @Column({
    name: 'annual_income_range',
    type: 'enum',
    enum: AnnualIncomeRange,
    enumName: 'annual_income_range',
    nullable: true,
  })
  annualIncomeRange!: AnnualIncomeRange | null;

  @Column({
    name: 'risk_appetite',
    type: 'enum',
    enum: RiskAppetite,
    enumName: 'risk_appetite',
    nullable: true,
  })
  riskAppetite!: RiskAppetite | null;

  @Column({
    name: 'base_currency',
    type: 'varchar',
    length: 3,
    default: 'INR',
  })
  baseCurrency!: string;
}
