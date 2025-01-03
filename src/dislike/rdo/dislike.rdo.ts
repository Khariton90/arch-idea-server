import { ReactionType } from '@shared-types';
import { Expose } from 'class-transformer';

export class DislikeRdo {
  @Expose()
  ideaId: string;

  @Expose()
  userId: string;

  @Expose()
  public reactionType: ReactionType;
}
