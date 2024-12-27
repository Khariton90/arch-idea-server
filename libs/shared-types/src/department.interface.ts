import { Location } from './location.type';

export interface Department {
  id?: string;
  title: Location;
  qrCodeHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}
