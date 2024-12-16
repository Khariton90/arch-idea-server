import { Entity } from '@core';
import { Comment, Idea, LikeDislike } from '@shared-types';

export class IdeaEntity implements Entity<IdeaEntity>, Idea {
  public title: string;
  public description: string;
  public priority: string;
  public status: string;
  public comments: Comment[];
  public likes: LikeDislike[];
  public dislikes: LikeDislike[];
  public author: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public subDepartmentId: string;

  constructor(idea: Idea) {
    this.fillEntity(idea);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(entity: Idea): void {
    this.title = entity.title;
    this.description = entity.description;
    this.author = entity.author;
    this.subDepartmentId = entity.subDepartmentId;
  }
}
