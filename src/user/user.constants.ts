import { UserStatus } from '@shared-types';

export const UNAUTHORIZED_MESSAGE = 'Access is denied';

export const mappingStatus: Record<UserStatus, number> = {
  Spec: 19,
  Master: 29,
  Pro: 39,
  Expert: 49,
  SuperExpert: 50,
  NotVerified: -1,
};
