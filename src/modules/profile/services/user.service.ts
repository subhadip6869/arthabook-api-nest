import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceAlreadyExistsException } from '../../../common/exceptions/resource-already-exists.exception';
import { ResourceNotFoundException } from '../../../common/exceptions/resource-not-found.exception';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserProfileResponse } from '../dto/user-profile.response';
import { User } from '../entities/user.entity';
import { FinancialProfileResponseDto } from '../dto/financial-profile-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createProfile(
    firebaseUid: string,
    email: string,
    request: CreateUserDto,
  ): Promise<UserProfileResponse> {
    const existingUser = await this.userRepository.findOne({
      where: { userId: firebaseUid },
    });

    if (existingUser) {
      throw new ResourceAlreadyExistsException('Profile already exists');
    }

    const user = this.userRepository.create({
      userId: firebaseUid,
      email,
      fullName: request.fullName,
      isdCode: request.isdCode ?? null,
      mobileNumber: request.mobileNumber ?? null,
      dateOfBirth: request.dateOfBirth ? new Date(request.dateOfBirth) : null,
      gender: request.gender ?? null,
      profilePhotoUrl: request.profilePhotoUrl ?? null,
    });

    const savedUser = await this.userRepository.save(user);

    return new UserProfileResponse(savedUser, null);
  }

  async updateProfile(
    firebaseUid: string,
    request: UpdateUserDto,
  ): Promise<UserProfileResponse> {
    const user = await this.findProfileWithFinancialProfile(firebaseUid);

    if (!user) {
      throw new ResourceNotFoundException('User profile not found');
    }

    user.fullName = request.fullName;
    user.isdCode = request.isdCode ?? null;
    user.mobileNumber = request.mobileNumber ?? null;
    user.profilePhotoUrl = request.profilePhotoUrl ?? null;
    user.dateOfBirth = request.dateOfBirth
      ? new Date(request.dateOfBirth)
      : null;
    user.gender = request.gender ?? null;

    await this.userRepository.save(user);
    return this.toProfileResponse(user);
  }

  async getProfile(firebaseUid: string): Promise<UserProfileResponse> {
    const user = await this.findProfileWithFinancialProfile(firebaseUid);

    if (!user) {
      throw new ResourceNotFoundException('User profile not found');
    }

    return this.toProfileResponse(user);
  }

  async deleteProfile(firebaseUid: string): Promise<string> {
    const result = await this.userRepository.delete({ userId: firebaseUid });

    if (result.affected === 0) {
      throw new ResourceNotFoundException('User profile not found');
    }

    return firebaseUid;
  }

  /// --- helper methods
  private async findProfileWithFinancialProfile(
    firebaseUid: string,
  ): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.financialProfile', 'financialProfile')
      .where('user.userId = :firebaseUid', {
        firebaseUid,
      })
      .select([
        // User
        'user.userId',
        'user.email',
        'user.isdCode',
        'user.mobileNumber',
        'user.fullName',
        'user.profilePhotoUrl',
        'user.dateOfBirth',
        'user.gender',
        'user.status',
        'user.onboardingCompleted',
        'user.createdAt',
        'user.updatedAt',

        // Financial profile
        'financialProfile.userId',
        'financialProfile.occupation',
        'financialProfile.annualIncomeRange',
        'financialProfile.riskAppetite',
        'financialProfile.baseCurrency',
      ])
      .getOne();
  }

  private toProfileResponse(user: User): UserProfileResponse {
    const financialProfile = user.financialProfile
      ? new FinancialProfileResponseDto(user.financialProfile)
      : null;

    return new UserProfileResponse(user, financialProfile);
  }
}
