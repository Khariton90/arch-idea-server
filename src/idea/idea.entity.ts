import { Entity } from '@core';
import { Idea, IdeaStatus } from '@shared-types';

export class IdeaEntity implements Entity<IdeaEntity>, Idea {
  id?: string;
  title: string;
  description: string;
  userId: string;
  department: string;
  subDepartment: string;
  priority: string;
  status: IdeaStatus;
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
    this.subDepartment = entity.subDepartment;
    this.priority = entity.priority;
    this.status = entity.status || 'New';
  }
}
