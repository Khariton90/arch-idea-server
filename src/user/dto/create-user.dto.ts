import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Invitation qr code',
    required: true,
    example:
      'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
  })
  @IsString()
  sub: string;

  @ApiProperty({
    description: 'Model device name',
    required: true,
    example: 'Iphone11',
  })
  @IsString()
  modelName: string;
}
