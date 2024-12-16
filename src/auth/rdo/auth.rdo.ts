import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AuthRdo {
  @ApiProperty({
    description: 'User accessToken',
    required: true,
    example: 'F0IjoxNzM0MzY2Njc0LCJleHAiOjE3MzQ0MDI2NzR9.Q5E20rEpyPH5jXlfdWi',
  })
  @Expose()
  @IsString()
  access_token: string;

  @ApiProperty({
    description: 'User refreshToken',
    required: true,
    example: 'F0IjoxNzM0MzY2Njc0LCJleHAiOjE3MzQ0MDI2NzR9.Q5E20rEpyPH5jXlfdWi',
  })
  @Expose()
  @IsString()
  refresh_token: string;
}
