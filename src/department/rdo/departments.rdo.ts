import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class DepartmentRdo {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  qrCodeHash: string;

  @Expose()
  @IsString()
  createdAt: string;

  @Expose()
  @IsString()
  updatedAt: string;
}
