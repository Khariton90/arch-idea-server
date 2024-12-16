export interface Idea {
  id?: string;
  title: string;
  description: string;
  userId: string;
  department: string;
  createdAt?: Date;
  updatedAt?: Date;
}
