import { ApiProperty } from '@nestjs/swagger';
import { Location, Priority, SubDepartment } from '@shared-types';
import { Expose } from 'class-transformer';
import { IsIn, IsString } from 'class-validator';

export class IdeaDto {
  @ApiProperty({
    description: 'The main title is the idea.',
    example: 'New Idea',
  })
  @Expose()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Full description of the idea.',
    example:
      'So far, Im just hearing a factual depiction of whats happening here.',
  })
  @Expose()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Idea Department',
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
    ,
  ])
  department: Location;

  @ApiProperty({
    description: 'Idea SubDepartment',
    example: 'SalesFloor',
  })
  @Expose()
  @IsString()
  @IsIn(['SalesFloor', 'Warehouse', 'CommercialDepartment', 'Other'])
  subDepartment: SubDepartment;

  @ApiProperty({
    description: 'Idea Priority',
    example: 'Medium',
  })
  @Expose()
  @IsString()
  @IsIn(['Low', 'Medium', 'High'])
  priority: Priority;
}
