import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;
}
