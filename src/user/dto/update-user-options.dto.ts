import { UserRole, UserStatus } from '@shared-types';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UpdateUserOptionsDto {
  @Expose()
  @IsOptional()
  role: UserRole;

  @Expose()
  @IsOptional()
  status: UserStatus;
}
