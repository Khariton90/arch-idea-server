import { Comment } from './comment.interface';
import { LikeDislike } from './like-dislike.interface';

export interface Idea {
  title: string;
  description: string;
  author: string;
  subDepartmentId: string;
  id?: string;
  priority?: string;
  status?: string;
  comments?: Comment[];
  likes?: LikeDislike[];
  dislikes?: LikeDislike[];
  createdAt?: Date;
  updatedAt?: Date;
}
