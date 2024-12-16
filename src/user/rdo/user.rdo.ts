import { replaceNullWithEmpty } from '@core';
import { Status } from '@shared-types';
import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UserRdo {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => replaceNullWithEmpty(value))
  firstName: string;

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => replaceNullWithEmpty(value))
  lastName: string;

  @Expose()
  @IsString()
  @IsEnum(Status)
  status: string = Status.Spec;

  @Expose()
  @IsString()
  department: string;
}
