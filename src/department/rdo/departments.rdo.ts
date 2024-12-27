import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@shared-types';
import { Expose } from 'class-transformer';
import { IsIn, IsString } from 'class-validator';

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
    type: Location,
    description: 'Department name',
    example: 'Parnas',
  })
  @Expose()
  @IsString()
  @IsIn([
    'Parnas',
    'Industrialny',
    'KadSever',
    'Planernaya',
    'Murmanskoe',
    'Sofiyskaya',
    'Tallinskaya',
    'Slavyanka',
    'Other',
  ])
  title: Location;

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
