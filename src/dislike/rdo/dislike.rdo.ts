import { ReactionType } from '@shared-types';
import { Expose, Transform } from 'class-transformer';

export class DislikeRdo {
  @Expose()
  @Transform(({ obj }) => {
    if (obj) {
      return 'Dislike' as ReactionType;
    }
    return 'None' as ReactionType;
  })
  public reactionType: ReactionType;
}
