import { Entity } from '@core';
import { FavoriteIdea } from '@shared-types';

export class FavoriteIdeaEntity implements Entity<FavoriteIdea>, FavoriteIdea {
  id?: string;
  userId: string;
  ideaId: string;

  constructor(favoriteIdea: FavoriteIdea) {
    this.fillEntity(favoriteIdea);
  }

  public toObject(): FavoriteIdea {
    return { ...this };
  }

  public fillEntity(entity: FavoriteIdea): void {
    this.userId = entity.userId;
    this.ideaId = entity.ideaId;
  }
}
