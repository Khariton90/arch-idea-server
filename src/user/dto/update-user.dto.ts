import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User firstName',
    required: true,
    example: 'John',
  })
  @Expose()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User lastName',
    required: true,
    example: 'Doe',
  })
  @Expose()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User email',
    required: true,
    example: '1@gmail.com',
  })
  @Expose()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: 'qwerty',
  })
  @Expose()
  @IsString()
  password: string;
}
