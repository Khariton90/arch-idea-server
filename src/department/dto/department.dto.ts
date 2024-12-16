import { Expose } from 'class-transformer';
import { IsIn, IsString } from 'class-validator';

export class DepartmentDto {
  @Expose()
  @IsString()
  @IsIn(['Парнас', 'Офис', 'Кад Север'])
  title: string;
}
