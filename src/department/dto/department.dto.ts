import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@shared-types';
import { Expose } from 'class-transformer';
import { IsIn, IsString } from 'class-validator';

export class DepartmentDto {
  @ApiProperty({
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
}
