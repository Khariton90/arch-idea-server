import { IdeaEntity } from './idea.entity';
import { Idea, ReactionType } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IdeaQuery } from './query/idea.query';

function getReactionType(likes: number, dislikes: number): ReactionType {
  if (likes) {
    return 'Like' as ReactionType;
  }

  if (dislikes) {
    return 'Dislike' as ReactionType;
  }

  return 'None' as ReactionType;
}

@Injectable()
export class IdeaRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findMany(
    { limit, sortDirection, page }: IdeaQuery,
    userId: string,
  ): Promise<Idea[] | []> {
    const ideas = await this.prisma.idea.findMany({
      take: limit,
      orderBy: [{ createdAt: sortDirection }],
      skip: page > 0 ? limit * (page - 1) : undefined,
      include: {
        favoriteIdea: {
          where: {
            userId,
          },
        },
        likes: {
          where: {
            userId,
          },
        },
        dislikes: {
          where: {
            userId,
          },
        },
      },
    });

    return ideas.map((idea) => ({
      isFavorite: idea.favoriteIdea.length > 0,
      likesCount: idea.likes.length,
      dislikesCount: idea.dislikes.length,
      reactionType: getReactionType(idea.likes.length, idea.dislikes.length),
      ...idea,
    }));
  }

  public async findById(ideaId: string, userId: string) {
    const idea = await this.prisma.idea.findFirst({
      where: { id: ideaId },
      include: {
        favoriteIdea: {
          where: {
            userId,
          },
        },
        likes: {
          where: {
            userId,
          },
        },
        dislikes: {
          where: {
            userId,
          },
        },
      },
    });

    return {
      isFavorite: idea.favoriteIdea.length > 0,
      likesCount: idea.likes.length,
      dislikesCount: idea.dislikes.length,
      reactionType: getReactionType(idea.likes.length, idea.dislikes.length),
      ...idea,
    };
  }

  public async create(item: IdeaEntity): Promise<Idea> {
    const data = item.toObject();
    await this.prisma.user.update({
      where: {
        id: item.userId,
      },
      data: {
        myIdeasCount: {
          increment: 1,
        },
      },
    });

    return this.prisma.idea.create({
      data: { ...data },
    });
  }
}
