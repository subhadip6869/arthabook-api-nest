import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/security/current-user.decorator';
import { FirebaseAuthGuard } from 'src/common/security/firebase-auth.guard';
import type { FirebaseUserPrincipal } from 'src/common/security/firebase-user-principal';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserProfileResponse } from '../dto/user-profile.response';
import { UserService } from '../services/user.service';

@Controller('users')
@UseGuards(FirebaseAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUserProfile(
    @CurrentUser() principal: FirebaseUserPrincipal,
    @Body() request: CreateUserDto,
  ): Promise<UserProfileResponse> {
    return this.userService.createProfile(
      principal.uid,
      principal.email,
      request,
    );
  }

  @Put()
  async updateProfile(
    @CurrentUser() principal: FirebaseUserPrincipal,
    @Body() request: UpdateUserDto,
  ): Promise<UserProfileResponse> {
    return this.userService.updateProfile(principal.uid, request);
  }

  @Get()
  async getProfile(
    @CurrentUser() principal: FirebaseUserPrincipal,
  ): Promise<UserProfileResponse> {
    return this.userService.getProfile(principal.uid);
  }

  @Delete()
  async deleteProfile(
    @CurrentUser() principal: FirebaseUserPrincipal,
  ): Promise<string> {
    return this.userService.deleteProfile(principal.uid);
  }
}
