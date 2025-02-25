import { IdeaEntity } from './idea.entity';
import { Idea } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IdeaQuery } from './query/idea.query';
import { getReactionType } from '@core';

@Injectable()
export class IdeaRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findCount(query: IdeaQuery) {
    const where = query.department ? { department: query.department } : {};
    return await this.prisma.idea.count({ where });
  }

  public async findOne(id: string) {
    return await this.prisma.idea.findUnique({ where: { id } });
  }

  public async findMany(
    {
      limit,
      page,
      department,
      sortOptions,
      sortDirection,
      status,
      priority,
      subDepartment,
    }: IdeaQuery,
    userId: string,
  ) {
    const createdAt = sortOptions === 'CreatedAt' ? 'asc' : undefined;

    const items = await this.prisma.idea.findMany({
      where: {
        department,
        status,
        priority,
        subDepartment,
      },
      take: limit,
      orderBy: [
        { createdAt: sortDirection },
        {
          createdAt,
        },
      ],
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

    const ideasList = items.map((idea) => {
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

    if (sortOptions === 'Popularity') {
      return ideasList.sort((a, b) => b.likesCount - a.likesCount);
    }

    return ideasList;
  }

  public async findUserIdeas(
    { limit, sortDirection, page, status }: IdeaQuery,
    userId: string,
  ) {
    const ideas = await this.prisma.idea.findMany({
      where: {
        userId,
        status,
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
    { limit, sortDirection, page, status }: IdeaQuery,
    userId: string,
  ): Promise<Idea[]> {
    const ideas = await this.prisma.idea.findMany({
      where: {
        status,
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

  public async findCompletedIdeasCount(userId: string) {
    const ideas = await this.prisma.idea.findMany({
      where: { userId, status: 'Completed' },
    });
    return ideas.length;
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

  public async update(id: string, item: IdeaEntity) {
    const data = item.toObject();

    const idea = await this.prisma.idea.update({
      where: { id },
      data: { ...data },
      include: {
        user: true,
        favoriteIdea: {
          where: {
            userId: data.userId,
          },
        },
        likes: true,
        dislikes: true,
      },
    });

    const isLiked = idea.likes.some((like) => like.userId === data.userId);
    const isDisliked = idea.dislikes.some(
      (dislike) => dislike.userId === data.userId,
    );

    return {
      isFavorite: idea.favoriteIdea.length > 0,
      likesCount: idea.likes.length,
      dislikesCount: idea.dislikes.length,
      reactionType: getReactionType(isLiked, isDisliked),
      ...idea,
    };
  }
}
