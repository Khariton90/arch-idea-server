import { Entity } from '@core';
import { Department } from '@shared-types';
import { genSalt, hash, compare } from 'bcrypt';

const SALT_ROUNDS = 10;

export class DepartmentEntity implements Entity<DepartmentEntity>, Department {
  public id?: string;
  public title: string;
  public qrCodeHash: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(department: Department) {
    this.fillEntity(department);
  }

  public async setHash(qrCode: string) {
    const salt = await genSalt(SALT_ROUNDS);
    this.qrCodeHash = await hash(qrCode, salt);
  }

  public async compareQrCodeHash(qrCode: string) {
    return compare(qrCode, this.qrCodeHash);
  }

  public toObject(): DepartmentEntity {
    return { ...this };
  }

  public fillEntity(entity: Department): void {
    this.title = entity.title;
    this.qrCodeHash = entity.qrCodeHash;
  }
}
