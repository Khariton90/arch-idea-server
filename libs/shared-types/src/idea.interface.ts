import { IdeaStatus } from './idea-status.type';
import { Location } from './location.type';
import { Priority } from './priority.type';
import { SubDepartment } from './sub-department.type';

export interface Idea {
  title: string;
  description: string;
  userId: string;
  department: Location;
  subDepartment: SubDepartment;
  priority: Priority;
  solution: string;
  id?: string;
  status?: IdeaStatus;
  createdAt?: Date;
  updatedAt?: Date;
  favoriteIdeasCount?: number;
  likesCount?: number;
  dislikesCount?: number;
}
