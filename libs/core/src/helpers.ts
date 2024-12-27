import { ReactionType } from '@shared-types';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}

export function replaceNullWithEmpty(value: string | null): string {
  return value ?? '';
}

export function getReactionType(
  likes: boolean,
  dislikes: boolean,
): ReactionType {
  if (likes) {
    return 'Like' as ReactionType;
  }

  if (dislikes) {
    return 'Dislike' as ReactionType;
  }

  return 'None' as ReactionType;
}
