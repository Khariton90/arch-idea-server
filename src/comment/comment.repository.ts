import { CRUDRepository } from '@core';
import { CommentEntity } from './comment.entity';
import { Comment } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class CommentRepository
  implements CRUDRepository<CommentEntity, string, Comment>
{
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: string): Promise<Comment> {
    return await this.prisma.comment.findFirst({
      where: { id },
    });
  }

  public async findMany(
    { limit, sortDirection, page }: CommentQuery,
    ideaId: string,
  ) {
    const totalCount = await this.prisma.comment.count({
      where: {
        ideaId,
      },
    });

    const comments = await this.prisma.comment.findMany({
      where: {
        ideaId,
      },
      include: {
        user: true,
      },
      take: limit,
      orderBy: [{ createdAt: sortDirection }],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });

    return { comments, totalCount };
  }

  public async create(item: CommentEntity): Promise<Comment> {
    const data = item.toObject();
    return await this.prisma.comment.create({
      data: { ...data },
      include: {
        user: true,
      },
    });
  }

  public async update(id: string, item: CommentEntity): Promise<Comment> {
    throw new Error('Method not implemented.');
  }

  public async destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
