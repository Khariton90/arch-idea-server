import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class DepartmentRdo {
  @ApiProperty({
    type: String,
    description: 'Unique user ID',
    example: '6428a0dc06396d71e8f37ee2',
  })
  @Expose()
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Title Department',
    example: 'Офис',
  })
  @Expose()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Qr code hash department',
    example: '6428a0dc06396d71e8f37ee2',
  })
  @Expose()
  @IsString()
  qrCodeHash: string;

  @ApiProperty({
    type: Date,
    description: 'Date of creation',
    example: '2024-12-16T16:45:20.547Z',
  })
  @Expose()
  @IsString()
  createdAt: string;

  @ApiProperty({
    type: Date,
    description: 'Date of updated',
    example: '2024-12-16T16:45:20.547Z',
  })
  @Expose()
  @IsString()
  updatedAt: string;
}
