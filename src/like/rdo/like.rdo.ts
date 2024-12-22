import { ReactionType } from '@shared-types';
import { Expose, Transform } from 'class-transformer';

export class LikeRdo {
  @Expose()
  @Transform(({ obj }) => {
    if (obj) {
      return 'Like' as ReactionType;
    }
  })
  public reactionType: ReactionType;
}
