import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceAlreadyExistsException } from 'src/common/exceptions/resource-already-exists.exception';
import { ResourceNotFoundException } from 'src/common/exceptions/resource-not-found.exception';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserProfileResponse } from '../../dto/user-profile.response';
import { User } from '../../entities/user.entity';

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

    return new UserProfileResponse(savedUser);
  }

  async updateProfile(
    firebaseUid: string,
    request: UpdateUserDto,
  ): Promise<UserProfileResponse> {
    const user = await this.userRepository.findOne({
      where: { userId: firebaseUid },
    });

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

    const savedUser = await this.userRepository.save(user);

    return new UserProfileResponse(savedUser);
  }

  async getProfile(firebaseUid: string): Promise<UserProfileResponse> {
    const user = await this.userRepository.findOne({
      where: { userId: firebaseUid },
    });

    if (!user) {
      throw new ResourceNotFoundException('User profile not found');
    }

    return new UserProfileResponse(user);
  }
}
