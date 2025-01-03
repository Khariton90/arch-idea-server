import { ReactionType } from '@shared-types';
import { Expose } from 'class-transformer';

export class LikeRdo {
  @Expose()
  ideaId: string;

  @Expose()
  userId: string;

  @Expose()
  public reactionType: ReactionType;
}
