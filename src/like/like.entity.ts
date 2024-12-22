import { Entity } from '@core';
import { LikeDislike } from '@shared-types';

export class LikeEntity implements Entity<LikeDislike>, LikeDislike {
  public id?: string;
  public ideaId: string;
  public userId: string;

  constructor(like: LikeDislike) {
    this.fillEntity(like);
  }

  public toObject(): LikeDislike {
    return { ...this };
  }

  public fillEntity(entity: LikeDislike): void {
    this.ideaId = entity.ideaId;
    this.userId = entity.userId;
  }
}
