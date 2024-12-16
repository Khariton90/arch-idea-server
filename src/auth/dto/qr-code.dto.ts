import { Expose } from 'class-transformer';

export class QrCodeDto {
  @Expose()
  sub: string;
}
