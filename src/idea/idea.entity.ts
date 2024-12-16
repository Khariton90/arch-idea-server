import { Entity } from '@core';
import { Idea } from '@shared-types';

export class IdeaEntity implements Entity<IdeaEntity>, Idea {
  id?: string;
  title: string;
  description: string;
  userId: string;
  department: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(idea: Idea) {
    this.fillEntity(idea);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(entity: Idea): void {
    this.title = entity.title;
    this.description = entity.description;
    this.userId = entity.userId;
    this.department = entity.department;
  }
}
