import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

@Entity({ name: 'users', schema: 'profile' })
@Unique('uq_email', ['email'])
export class User {
  @PrimaryColumn({
    name: 'user_id',
    type: 'varchar',
    length: 128,
  })
  userId!: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 320,
    update: false,
  })
  email!: string;

  @Column({
    name: 'isd_code',
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  isdCode!: string | null;

  @Column({
    name: 'mobile_number',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  mobileNumber!: string | null;

  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 150,
  })
  fullName!: string;

  @Column({
    name: 'profile_photo_url',
    type: 'text',
    nullable: true,
  })
  profilePhotoUrl!: string | null;

  @Column({
    name: 'date_of_birth',
    type: 'date',
    nullable: true,
  })
  dateOfBirth!: Date | null;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: UserGender,
    enumName: 'user_gender',
    nullable: true,
  })
  gender!: UserGender | null;

  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatus,
    enumName: 'user_status',
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @Column({
    name: 'onboarding_completed',
    type: 'boolean',
    default: false,
  })
  onboardingCompleted!: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt!: Date;

  @VersionColumn({
    name: 'version',
    type: 'bigint',
    default: 0,
  })
  version!: string;
}
