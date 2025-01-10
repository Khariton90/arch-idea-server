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
    description: 'User login',
    required: true,
    example: 'par_user_2323',
  })
  @Expose()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: 'qwerty',
  })
  @Expose()
  @IsString()
  password: string;
}
