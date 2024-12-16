import { replaceNullWithEmpty } from '@core';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@shared-types';
import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UserRdo {
  @ApiProperty({
    description: 'Unique ID',
    required: true,
    example: 'eyJzdWIiOiIxMjM',
  })
  @Expose()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'User firstName',
    required: true,
    example: 'John',
  })
  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => replaceNullWithEmpty(value))
  firstName: string;

  @ApiProperty({
    description: 'User lastName',
    required: true,
    example: 'Doe',
  })
  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => replaceNullWithEmpty(value))
  lastName: string;

  @ApiProperty({
    description: 'User status',
    required: true,
    example: 'spec',
  })
  @Expose()
  @IsString()
  @IsEnum(Status)
  status: string = Status.Spec;

  @ApiProperty({
    description: 'User Department',
    required: true,
    example: 'Офис',
  })
  @Expose()
  @IsString()
  department: string;
}
