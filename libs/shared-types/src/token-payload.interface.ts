import { Location } from './location.type';
import { UserRole } from './user-role.type';

export interface TokenPayload {
  sub: string;
  role: UserRole;
  department: Location;
}
