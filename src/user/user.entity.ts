import { Entity } from '@core';
import { Location, User, UserRole, UserStatus } from '@shared-types';

const DEFAULT_USER_NAME = 'Гость';

export class UserEntity implements Entity<UserEntity>, User {
  firstName: string;
  lastName: string;
  department: Location;
  id?: string;
  role?: UserRole;
  status?: UserStatus;
  favoriteIdeasCount?: number;
  myIdeasCount?: number;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: User) {
    this.department = user.department;
    this.firstName = user.firstName || DEFAULT_USER_NAME;
    this.lastName = user.lastName || '';
    this.role = user.role || 'User';
    this.status = user.status || 'Spec';
    this.favoriteIdeasCount = user.favoriteIdeasCount || 0;
    this.myIdeasCount = user.myIdeasCount || 0;
  }
}
