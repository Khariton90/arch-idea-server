import { CRUDRepository } from '@core';
import { IdeaEntity } from './idea.entity';
import { Idea } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IdeaQuery } from './query/idea.query';

@Injectable()
export class IdeaRepository
  implements CRUDRepository<IdeaEntity, string, Idea>
{
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
      },
    });

    return ideas.map((idea) => ({
      ...idea,
      isFavorite: idea.favoriteIdea.length > 0,
    }));
  }

  public async findById(id: string) {
    const idea = await this.prisma.idea.findFirst({
      where: { id },
      include: {
        favoriteIdea: {
          where: {
            ideaId: id,
          },
        },
      },
    });

    return { ...idea, isFavorite: idea.favoriteIdea.length > 0 };
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

  public async update(id: string, item: IdeaEntity): Promise<Idea> {
    throw new Error('Method not implemented.');
  }

  public async destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
