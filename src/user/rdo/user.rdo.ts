import { replaceNullWithEmpty } from '@core';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { UserRole, UserStatus } from '@shared-types';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UserRdo {
  @Expose()
  login: string;

  @ApiProperty({
    description: 'User Role',
    required: true,
    example: 'User',
  })
  @Expose()
  role: UserRole;

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

export class UserListRdo {
  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(UserRdo) },
    description: 'User list',
  })
  @Expose()
  @Type(() => UserRdo)
  @ValidateNested({ each: true })
  @Expose()
  users: UserRdo[];

  @ApiProperty({ type: Number, description: 'Total user list count' })
  @Expose()
  count: number;
}
