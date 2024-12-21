import { Entity } from '@core';
import { Comment } from '@shared-types';

export class CommentEntity implements Entity<Comment>, Comment {
  public id?: string;
  public content: string;
  public ideaId: string;
  public userId: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject(): Comment {
    return { ...this };
  }

  public fillEntity(entity: Comment): void {
    this.content = entity.content;
    this.ideaId = entity.ideaId;
    this.userId = entity.userId;
  }
}
