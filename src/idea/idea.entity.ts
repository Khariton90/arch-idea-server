import { Entity } from '@core';
import {
  Comment,
  Idea,
  IdeaStatus,
  LikeDislike,
  Priority,
} from '@shared-types';

export class IdeaEntity implements Entity<Idea> {
  public id?: string;
  public title: string;
  public description: string;
  public priority: Priority;
  public authorId: string;
  public status: IdeaStatus;
  public comments: Comment[];
  public likes: LikeDislike[];
  public dislikes: LikeDislike[];
  public subDepartmentId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(idea: Idea) {
    this.fillEntity(idea);
  }

  public toObject(): Idea {
    return { ...this };
  }

  public fillEntity(entity: Idea): void {
    this.id = entity.id;
    this.title = entity.title;
    this.description = entity.description;
    this.priority = entity.priority;
    this.authorId = entity.authorId;
    this.status = entity.status;
    this.subDepartmentId = entity.subDepartmentId;
    this.comments = [];
    this.likes = [];
    this.dislikes = [];
  }
}
