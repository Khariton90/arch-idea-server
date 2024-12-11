import { Idea } from './idea.interface';

export interface SubDepartment {
  id?: string;
  name: string;
  departmentId: string;
  ideas: Idea[];
}
