import { IdeaStatus } from './idea-status.type';

export interface Idea {
  id?: string;
  title: string;
  description: string;
  userId: string;
  department: string;
  subDepartment: string;
  priority: string;
  status?: IdeaStatus;
  createdAt?: Date;
  updatedAt?: Date;
  favoriteIdeasCount?: number;
  dislikedIdeasCount?: number;
}
