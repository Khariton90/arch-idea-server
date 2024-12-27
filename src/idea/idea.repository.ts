import { IdeaEntity } from './idea.entity';
import { Idea } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IdeaQuery } from './query/idea.query';
import { getReactionType } from '@core';

@Injectable()
export class IdeaRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findMany(
    { limit, sortDirection, page, department }: IdeaQuery,
    userId: string,
  ): Promise<Idea[] | []> {
    const where = department ? { department } : {};

    const ideas = await this.prisma.idea.findMany({
      where,
      take: limit,
      orderBy: [{ createdAt: sortDirection }],
      skip: page > 0 ? limit * (page - 1) : undefined,
      include: {
        user: true,
        favoriteIdea: {
          where: {
            userId,
          },
        },
        likes: true,
        dislikes: true,
      },
    });

    return ideas.map((idea) => {
      const isLiked = idea.likes.some((like) => like.userId === userId);
      const isDisliked = idea.dislikes.some(
        (dislike) => dislike.userId === userId,
      );
      return {
        isFavorite: idea.favoriteIdea.length > 0,
        likesCount: idea.likes.length,
        dislikesCount: idea.dislikes.length,
        reactionType: getReactionType(isLiked, isDisliked),
        ...idea,
      };
    });
  }

  public async findUserIdeas(
    { limit, sortDirection, page }: IdeaQuery,
    userId: string,
  ) {
    const ideas = await this.prisma.idea.findMany({
      where: {
        userId,
      },
      take: limit,
      orderBy: [{ createdAt: sortDirection }],
      skip: page > 0 ? limit * (page - 1) : undefined,
      include: {
        user: true,
        favoriteIdea: true,
        likes: true,
        dislikes: true,
      },
    });

    return ideas.map((idea) => {
      const isLiked = idea.likes.some((like) => like.userId === userId);
      const isDisliked = idea.dislikes.some(
        (dislike) => dislike.userId === userId,
      );
      return {
        isFavorite: idea.favoriteIdea.length > 0,
        likesCount: idea.likes.length,
        dislikesCount: idea.dislikes.length,
        reactionType: getReactionType(isLiked, isDisliked),
        ...idea,
      };
    });
  }

  public async findFavoriteIdeas(
    { limit, sortDirection, page }: IdeaQuery,
    userId: string,
  ): Promise<Idea[]> {
    const ideas = await this.prisma.idea.findMany({
      where: {
        favoriteIdea: {
          some: {
            userId,
          },
        },
      },
      take: limit,
      orderBy: [{ createdAt: sortDirection }],
      skip: page > 0 ? limit * (page - 1) : undefined,
      include: {
        user: true,
        favoriteIdea: true,
        likes: true,
        dislikes: true,
      },
    });

    return ideas.map((idea) => {
      const isLiked = idea.likes.some((like) => like.userId === userId);
      const isDisliked = idea.dislikes.some(
        (dislike) => dislike.userId === userId,
      );
      return {
        isFavorite: idea.favoriteIdea.length > 0,
        likesCount: idea.likes.length,
        dislikesCount: idea.dislikes.length,
        reactionType: getReactionType(isLiked, isDisliked),
        ...idea,
      };
    });
  }

  public async findById(ideaId: string, userId: string) {
    const idea = await this.prisma.idea.findFirst({
      where: { id: ideaId },
      include: {
        user: true,
        favoriteIdea: {
          where: {
            userId,
          },
        },
        likes: true,
        dislikes: true,
      },
    });

    const isLiked = idea.likes.some((like) => like.userId === userId);
    const isDisliked = idea.dislikes.some(
      (dislike) => dislike.userId === userId,
    );

    return {
      isFavorite: idea.favoriteIdea.length > 0,
      likesCount: idea.likes.length,
      dislikesCount: idea.dislikes.length,
      reactionType: getReactionType(isLiked, isDisliked),
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
