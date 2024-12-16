import { Entity } from '@core';
import { User } from '@shared-types';

export class UserEntity implements Entity<UserEntity>, User {
  firstName: string;
  lastName: string;
  id?: string;
  role: string;
  status: string;
  department: string;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: User) {
    this.firstName = user.firstName || undefined;
    this.lastName = user.lastName || undefined;
    this.role = user.role;
    this.status = user.status;
    this.department = user.department;
  }
}
