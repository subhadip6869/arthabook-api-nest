import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

import { UserGender } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @MaxLength(150)
  fullName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(5)
  @Matches(/^(?!\s*$).+$/, { message: 'ISD code must not be blank' })
  isdCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^(?!\s*$).+$/, { message: 'Mobile number must not be blank' })
  mobileNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @Matches(/^(?!\s*$).+$/, { message: 'Profile photo URL must not be blank' })
  profilePhotoUrl?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(UserGender)
  gender?: UserGender;
}
