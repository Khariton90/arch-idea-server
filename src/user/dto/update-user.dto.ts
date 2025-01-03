import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User firstName',
    required: true,
    example: 'John',
  })
  @Expose()
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User lastName',
    required: true,
    example: 'Doe',
  })
  @Expose()
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User email',
    required: true,
    example: '1@gmail.com',
  })
  @Expose()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: 'qwerty',
  })
  @Expose()
  @IsOptional()
  @IsString()
  password: string;
}
