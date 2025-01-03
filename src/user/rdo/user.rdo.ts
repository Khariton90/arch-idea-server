import { replaceNullWithEmpty } from '@core';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@shared-types';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
    example: 'Spec',
  })
  @Expose()
  @IsString()
  status: UserStatus = 'Spec';

  @ApiProperty({
    description: 'User Department',
    required: true,
    example: 'Офис',
  })
  @Expose()
  @IsString()
  department: string;

  @ApiProperty({
    description: 'Favorite Ideas Count',
    required: true,
    example: '10',
  })
  @Expose()
  @IsNumber()
  favoriteIdeasCount: number;

  @ApiProperty({
    description: 'My Ideas Count',
    required: true,
    example: '10',
  })
  @Expose()
  @IsNumber()
  myIdeasCount: number;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique ID',
    required: true,
    example: 'eyJzdWIiOiIxMjM',
  })
  @Expose()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'User status',
    required: true,
    example: 'Spec',
  })
  @Expose()
  @IsString()
  status: UserStatus;

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
}
