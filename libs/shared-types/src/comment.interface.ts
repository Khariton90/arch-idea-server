export interface Comment {
  id?: string;
  content: string;
  ideaId: string;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
