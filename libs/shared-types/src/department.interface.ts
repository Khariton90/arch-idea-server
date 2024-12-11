import { QrCode } from './qr-code.interface';
import { SubDepartment } from './sub-department.interface';

export interface Department {
  id?: string;
  name: string;
  subDepartment: SubDepartment[];
  qrCodes: QrCode[];
  createdAt?: Date;
  updatedAt?: Date;
}
