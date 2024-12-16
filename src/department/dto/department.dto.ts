import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsIn, IsString } from 'class-validator';

export class DepartmentDto {
  @ApiProperty({
    description: 'Department name',
    example: 'Офис',
  })
  @Expose()
  @IsString()
  @IsIn(['Парнас', 'Офис', 'Кад Север'])
  title: string;
}
