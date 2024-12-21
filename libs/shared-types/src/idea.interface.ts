import { IdeaStatus } from './idea-status.type';
import { Priority } from './priority.type';

export interface Idea {
  id?: string;
  title: string;
  description: string;
  userId: string;
  department: string;
  subDepartment: string;
  priority: Priority;
  status?: IdeaStatus;
  createdAt?: Date;
  updatedAt?: Date;
  favoriteIdeasCount?: number;
  dislikedIdeasCount?: number;
}
