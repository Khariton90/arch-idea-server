import { IdeaStatus } from './idea-status.enum';
import { Priority } from './priority.enum';
import { Comment } from './comment.interface';
import { LikeDislike } from './like-dislike.interface';

export interface Idea {
  id?: string;
  title: string;
  description: string;
  priority: Priority;
  authorId: string;
  status: IdeaStatus;
  comments: Comment[];
  likes: LikeDislike[];
  dislikes: LikeDislike[];
  createdAt?: Date;
  updatedAt?: Date;
}
