import { Location } from './location.type';
import { UserRole } from './user-role.type';
import { UserStatus } from './user-status.type';

export interface User {
  department: Location;
  login?: string;
  firstName?: string;
  lastName?: string;
  id?: string;
  favoriteIdeasCount?: number;
  myIdeasCount?: number;
  status?: UserStatus;
  role: UserRole;
  isDeleted?: boolean;
  passwordHash?: string;
}
