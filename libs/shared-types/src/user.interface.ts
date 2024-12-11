import { Idea } from './idea.interface';
import { LikeDislike } from './like-dislike.interface';
import { QrCode } from './qr-code.interface';
import { UserRole } from './user-role.enum';
import { Status } from './user-status.enum';

export interface User {
  id?: string;
  name: string;
  status: Status;
  role: UserRole;
  ideas: Idea[];
  comments: Comment[];
  likes: LikeDislike[];
  dislikes: LikeDislike[];
  qrCode: QrCode[];
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
