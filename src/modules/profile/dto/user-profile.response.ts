import { User, UserGender, UserStatus } from '../entities/user.entity';

export class UserProfileResponse {
  userId: string;
  email: string;
  isdCode: string | null;
  mobileNumber: string | null;
  fullName: string;
  profilePhotoUrl: string | null;
  dateOfBirth: Date | null;
  gender: UserGender | null;
  status: UserStatus;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.userId = user.userId;
    this.email = user.email;
    this.isdCode = user.isdCode;
    this.mobileNumber = user.mobileNumber;
    this.fullName = user.fullName;
    this.profilePhotoUrl = user.profilePhotoUrl;
    this.dateOfBirth = user.dateOfBirth;
    this.gender = user.gender;
    this.status = user.status;
    this.onboardingCompleted = user.onboardingCompleted;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
